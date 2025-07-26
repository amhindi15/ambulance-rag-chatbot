import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button.jsx'
import { ArrowRight, Home } from 'lucide-react'

function PageHeader({ title, titleEn, showInstructions = false }) {
  const navigate = useNavigate()

  const instructions = `تعليمات هامة:
• إذا الحالة ألم في الصدر لا تنسى تعطي أسبرين 300 ملغ وإذا لا يوجد 0 في خانة الأدوية مع ذكر السبب
• إذا الحالة ربو لا تنسى تعطي بخار فينتولين 5 ملغ للكبار و 2.5 للصغار وتسجلها في الأدوية وإذا لا يوجد 0 مع ذكر السبب
• إذا الحالة تشنجات مستمرة وأنت فرقة متقدمة لا تنسى تعطي ميدازولام وإذا فرقة أساسية غير الحالة إلى (تعب عام مثلاً)`

  return (
    <header className="red-crescent-bg text-white py-6">
      <div className="container mx-auto px-4">
        {/* أزرار التنقل */}
        <div className="flex justify-between items-center mb-6">
          <Button
            onClick={() => navigate(-1)}
            variant="outline"
            className="bg-white/20 border-white/30 text-white hover:bg-white/30"
          >
            <ArrowRight className="w-4 h-4 ml-2" />
            <span className="arabic-font">رجوع</span>
          </Button>
          
          <Button
            onClick={() => navigate('/')}
            variant="outline"
            className="bg-white/20 border-white/30 text-white hover:bg-white/30"
          >
            <Home className="w-4 h-4 ml-2" />
            <span className="arabic-font">الرئيسية</span>
          </Button>
        </div>

        {/* العنوان */}
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-2 arabic-font rtl">
            {title}
          </h1>
          <h2 className="text-xl md:text-2xl font-light ltr">
            {titleEn}
          </h2>
        </div>

        {/* التعليمات الهامة */}
        {showInstructions && (
          <div className="mt-8 bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <h3 className="text-xl font-bold mb-4 arabic-font rtl text-yellow-200">
              تعليمات هامة
            </h3>
            <div className="text-sm arabic-font rtl space-y-2 text-white/90">
              {instructions.split('\n').map((line, index) => (
                line.trim() && (
                  <p key={index} className="leading-relaxed">
                    {line}
                  </p>
                )
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default PageHeader

