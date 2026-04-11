import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ChevronLeft, Plus, Trash2, Check, Building2, Users, Lightbulb, Send } from 'lucide-react';

interface Participant {
  id: string;
  name: string;
  birthDate: string;
  notes: string;
}

interface FormData {
  institutionName: string;
  institutionType: string;
  phone: string;
  address: string;
  participants: Participant[];
  projectName: string;
  projectSummary: string;
  projectContent: string;
  projectType: string;
  confirmed: boolean;
}

export default function RegistrationForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    institutionName: '',
    institutionType: '',
    phone: '',
    address: '',
    participants: [{ id: '1', name: '', birthDate: '', notes: '' }],
    projectName: '',
    projectSummary: '',
    projectContent: '',
    projectType: '',
    confirmed: false
  });

  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // 🔗 Paste your Google Apps Script Web App URL here after deploying
  // Google Forms submission endpoint — linked to your Google Sheet automatically
  const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSdDq7CZ8atPJ4Vo8jIO1OahlkcIWgZNiT8Mvw6rq9nhkknHsw/formResponse';

  const totalSteps = 4;

  const addParticipant = () => {
    setFormData({
      ...formData,
      participants: [
        ...formData.participants,
        { id: Date.now().toString(), name: '', birthDate: '', notes: '' }
      ]
    });
  };

  const removeParticipant = (id: string) => {
    if (formData.participants.length > 1) {
      setFormData({
        ...formData,
        participants: formData.participants.filter(p => p.id !== id)
      });
    }
  };

  const updateParticipant = (id: string, field: keyof Participant, value: string) => {
    setFormData({
      ...formData,
      participants: formData.participants.map(p =>
        p.id === id ? { ...p, [field]: value } : p
      )
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSubmitError(null);

    // Map form data to Google Form entry IDs
    const formBody = new URLSearchParams({
      'entry.527381874':  new Date().toLocaleString('ar-DZ'),                          // تاريخ التسجيل
      'entry.1849443816': formData.institutionName,                                    // اسم المؤسسة
      'entry.182900256':  formData.institutionType,                                    // نوع المؤسسة
      'entry.1014325679': formData.phone,                                              // رقم الهاتف
      'entry.211677464':  formData.address,                                            // العنوان
      'entry.1657673841': String(formData.participants.length),                        // عدد المشاركين
      'entry.876246952':  formData.participants                                        // المشاركون
        .map((p) => `${p.name} (${p.birthDate})${p.notes ? ' - ' + p.notes : ''}`)
        .join(' | '),
      'entry.1800208385': formData.projectName,                                        // اسم المشروع
      'entry.2013537736': formData.projectType,                                        // نوع المشروع
      'entry.1527921812': formData.projectSummary,                                     // ملخص المشروع
      'entry.2000438435': formData.projectContent,                                     // تفاصيل المشروع
    });

    try {
      await fetch(GOOGLE_FORM_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formBody.toString(),
      });
      // no-cors means we can't read the response, but if no network error → success
      setSubmitted(true);
    } catch (err) {
      console.error('Submission error:', err);
      setSubmitError('حدث خطأ أثناء الإرسال. يرجى التحقق من اتصالك بالإنترنت والمحاولة مجدداً.');
    } finally {
      setIsLoading(false);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.institutionName && formData.institutionType && formData.phone && formData.address;
      case 2:
        return formData.participants.every(p => p.name && p.birthDate);
      case 3:
        return formData.projectName && formData.projectSummary && formData.projectContent && formData.projectType;
      case 4:
        return formData.confirmed;
      default:
        return false;
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-br from-green-950/40 to-emerald-950/40 backdrop-blur-sm border border-green-500/30 rounded-3xl p-12 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.6 }}
          className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center"
        >
          <Check className="w-12 h-12 text-white" />
        </motion.div>
        <h3 className="text-3xl mb-4" style={{ fontFamily: "'Cairo', sans-serif", fontWeight: 700 }}>
          تم التسجيل بنجاح!
        </h3>
        <p className="text-lg text-green-100 mb-6">
          شكراً لتسجيلك في المخيم الوطني للروبوتيك 2026
        </p>
        <p className="text-gray-300">
          سيتم التواصل معك قريباً عبر البريد الإلكتروني أو الهاتف
        </p>
      </motion.div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-cyan-950/30 to-blue-950/30 backdrop-blur-sm border border-cyan-500/20 rounded-3xl p-8 md:p-12">
      {/* Progress Bar */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-4">
          {[
            { num: 1, label: 'المؤسسة', icon: Building2 },
            { num: 2, label: 'المشاركين', icon: Users },
            { num: 3, label: 'المشروع', icon: Lightbulb },
            { num: 4, label: 'الإرسال', icon: Send }
          ].map((step) => (
            <div key={step.num} className="flex flex-col items-center flex-1">
              <motion.div
                className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                  currentStep >= step.num
                    ? 'bg-gradient-to-br from-cyan-500 to-blue-600'
                    : 'bg-gray-700 border border-gray-600'
                }`}
                animate={{
                  scale: currentStep === step.num ? 1.1 : 1,
                  boxShadow: currentStep === step.num ? '0 0 30px rgba(34,211,238,0.6)' : 'none'
                }}
                transition={{ duration: 0.3 }}
              >
                <step.icon className="w-5 h-5 text-white" />
              </motion.div>
              <span className="text-xs text-gray-400 hidden md:block">{step.label}</span>
            </div>
          ))}
        </div>
        <div className="relative h-2 bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            className="absolute top-0 right-0 h-full bg-gradient-to-l from-cyan-500 to-blue-600"
            initial={{ width: '0%' }}
            animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <AnimatePresence mode="wait">
          {/* Step 1: Institution */}
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <h3 className="text-2xl mb-6" style={{ fontFamily: "'Cairo', sans-serif", fontWeight: 700 }}>
                معلومات المؤسسة
              </h3>

              <div>
                <label className="block text-cyan-300 mb-2">اسم المؤسسة *</label>
                <input
                  type="text"
                  value={formData.institutionName}
                  onChange={(e) => setFormData({ ...formData, institutionName: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-cyan-500/30 rounded-xl text-white focus:outline-none focus:border-cyan-400 transition-colors"
                  placeholder="أدخل اسم المؤسسة"
                  required
                />
              </div>

              <div>
                <label className="block text-cyan-300 mb-2">نوع المؤسسة *</label>
                <select
                  value={formData.institutionType}
                  onChange={(e) => setFormData({ ...formData, institutionType: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-cyan-500/30 rounded-xl text-white focus:outline-none focus:border-cyan-400 transition-colors"
                  required
                >
                  <option value="">اختر نوع المؤسسة</option>
                  <option value="دار شباب">دار شباب</option>
                  <option value="إقامة">إقامة</option>
                  <option value="مدرسة">مدرسة</option>
                  <option value="جامعة">جامعة</option>
                  <option value="أخرى">أخرى</option>
                </select>
              </div>

              <div>
                <label className="block text-cyan-300 mb-2">رقم الهاتف *</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-cyan-500/30 rounded-xl text-white focus:outline-none focus:border-cyan-400 transition-colors"
                  placeholder="05XX XX XX XX"
                  required
                />
              </div>

              <div>
                <label className="block text-cyan-300 mb-2">العنوان *</label>
                <textarea
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-cyan-500/30 rounded-xl text-white focus:outline-none focus:border-cyan-400 transition-colors resize-none"
                  rows={3}
                  placeholder="أدخل العنوان الكامل"
                  required
                />
              </div>
            </motion.div>
          )}

          {/* Step 2: Participants */}
          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl" style={{ fontFamily: "'Cairo', sans-serif", fontWeight: 700 }}>
                  المشاركين
                </h3>
                <button
                  type="button"
                  onClick={addParticipant}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-l from-cyan-500 to-blue-600 rounded-lg hover:scale-105 transition-transform"
                >
                  <Plus className="w-4 h-4" />
                  إضافة مشارك
                </button>
              </div>

              <div className="space-y-4">
                {formData.participants.map((participant, index) => (
                  <motion.div
                    key={participant.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gray-900/30 border border-cyan-500/20 rounded-xl p-4"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-cyan-300" style={{ fontFamily: "'Cairo', sans-serif", fontWeight: 600 }}>
                        مشارك {index + 1}
                      </span>
                      {formData.participants.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeParticipant(participant.id)}
                          className="text-red-400 hover:text-red-300 transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm text-cyan-300 mb-1">الاسم واللقب *</label>
                        <input
                          type="text"
                          value={participant.name}
                          onChange={(e) => updateParticipant(participant.id, 'name', e.target.value)}
                          className="w-full px-3 py-2 bg-gray-900/50 border border-cyan-500/30 rounded-lg text-white focus:outline-none focus:border-cyan-400 transition-colors"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm text-cyan-300 mb-1">تاريخ الميلاد *</label>
                        <input
                          type="date"
                          value={participant.birthDate}
                          onChange={(e) => updateParticipant(participant.id, 'birthDate', e.target.value)}
                          className="w-full px-3 py-2 bg-gray-900/50 border border-cyan-500/30 rounded-lg text-white focus:outline-none focus:border-cyan-400 transition-colors"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm text-cyan-300 mb-1">ملاحظات</label>
                        <input
                          type="text"
                          value={participant.notes}
                          onChange={(e) => updateParticipant(participant.id, 'notes', e.target.value)}
                          className="w-full px-3 py-2 bg-gray-900/50 border border-cyan-500/30 rounded-lg text-white focus:outline-none focus:border-cyan-400 transition-colors"
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 3: Project */}
          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <h3 className="text-2xl mb-6" style={{ fontFamily: "'Cairo', sans-serif", fontWeight: 700 }}>
                تفاصيل المشروع
              </h3>

              <div>
                <label className="block text-cyan-300 mb-2">اسم المشروع *</label>
                <input
                  type="text"
                  value={formData.projectName}
                  onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-cyan-500/30 rounded-xl text-white focus:outline-none focus:border-cyan-400 transition-colors"
                  placeholder="أدخل اسم المشروع"
                  required
                />
              </div>

              <div>
                <label className="block text-cyan-300 mb-2">نوع المشروع *</label>
                <select
                  value={formData.projectType}
                  onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-cyan-500/30 rounded-xl text-white focus:outline-none focus:border-cyan-400 transition-colors"
                  required
                >
                  <option value="">اختر نوع المشروع</option>
                  <option value="روبوت">روبوت</option>
                  <option value="AI">ذكاء اصطناعي (AI)</option>
                  <option value="IoT">إنترنت الأشياء (IoT)</option>
                  <option value="أتمتة">أتمتة</option>
                  <option value="طائرة مسيرة">طائرة مسيرة (Drone)</option>
                  <option value="أخرى">أخرى</option>
                </select>
              </div>

              <div>
                <label className="block text-cyan-300 mb-2">مختصر حول المشروع *</label>
                <textarea
                  value={formData.projectSummary}
                  onChange={(e) => setFormData({ ...formData, projectSummary: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-cyan-500/30 rounded-xl text-white focus:outline-none focus:border-cyan-400 transition-colors resize-none"
                  rows={3}
                  placeholder="وصف مختصر للمشروع (2-3 جمل)"
                  required
                />
              </div>

              <div>
                <label className="block text-cyan-300 mb-2">محتوى المشروع التفصيلي *</label>
                <textarea
                  value={formData.projectContent}
                  onChange={(e) => setFormData({ ...formData, projectContent: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-cyan-500/30 rounded-xl text-white focus:outline-none focus:border-cyan-400 transition-colors resize-none"
                  rows={6}
                  placeholder="اشرح مشروعك بالتفصيل: الهدف، التقنيات المستخدمة، المراحل..."
                  required
                />
              </div>
            </motion.div>
          )}

          {/* Step 4: Confirmation */}
          {currentStep === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <h3 className="text-2xl mb-6" style={{ fontFamily: "'Cairo', sans-serif", fontWeight: 700 }}>
                مراجعة وتأكيد
              </h3>

              <div className="space-y-4 bg-gray-900/30 border border-cyan-500/20 rounded-xl p-6">
                <div>
                  <h4 className="text-cyan-300 mb-2" style={{ fontFamily: "'Cairo', sans-serif", fontWeight: 600 }}>المؤسسة</h4>
                  <p className="text-gray-300">{formData.institutionName} - {formData.institutionType}</p>
                </div>

                <div>
                  <h4 className="text-cyan-300 mb-2" style={{ fontFamily: "'Cairo', sans-serif", fontWeight: 600 }}>عدد المشاركين</h4>
                  <p className="text-gray-300">{formData.participants.length} مشارك/ين</p>
                </div>

                <div>
                  <h4 className="text-cyan-300 mb-2" style={{ fontFamily: "'Cairo', sans-serif", fontWeight: 600 }}>المشروع</h4>
                  <p className="text-gray-300">{formData.projectName} ({formData.projectType})</p>
                </div>
              </div>

              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={formData.confirmed}
                  onChange={(e) => setFormData({ ...formData, confirmed: e.target.checked })}
                  className="mt-1 w-5 h-5 accent-cyan-500"
                  required
                />
                <span className="text-gray-300 group-hover:text-white transition-colors">
                  أؤكد أن جميع المعلومات المدخلة صحيحة وأوافق على شروط المشاركة في المخيم الوطني للروبوتيك 2026
                </span>
              </label>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mt-12 pt-8 border-t border-cyan-500/20">
          <button
            type="button"
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all ${
              currentStep === 1
                ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                : 'bg-gray-700 hover:bg-gray-600 text-white'
            }`}
          >
            <ChevronRight className="w-5 h-5" />
            السابق
          </button>

          {currentStep < totalSteps ? (
            <button
              type="button"
              onClick={() => canProceed() && setCurrentStep(Math.min(totalSteps, currentStep + 1))}
              disabled={!canProceed()}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all ${
                canProceed()
                  ? 'bg-gradient-to-l from-cyan-500 to-blue-600 hover:scale-105 text-white'
                  : 'bg-gray-700 text-gray-500 cursor-not-allowed'
              }`}
            >
              التالي
              <ChevronLeft className="w-5 h-5" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={!canProceed() || isLoading}
              className={`flex items-center gap-2 px-8 py-3 rounded-xl transition-all ${
                canProceed() && !isLoading
                  ? 'bg-gradient-to-l from-green-500 to-emerald-600 hover:scale-105 text-white shadow-[0_0_30px_rgba(16,185,129,0.5)]'
                  : 'bg-gray-700 text-gray-500 cursor-not-allowed'
              }`}
              style={{ fontFamily: "'Cairo', sans-serif", fontWeight: 700 }}
            >
              {isLoading ? (
                <>
                  <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  جاري الإرسال...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  إرسال التسجيل
                </>
              )}
            </button>
          )}
        </div>

        {/* Error message */}
        {submitError && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-4 bg-red-950/40 border border-red-500/30 rounded-xl text-red-300 text-center"
          >
            ⚠️ {submitError}
          </motion.div>
        )}
      </form>
    </div>
  );
}
