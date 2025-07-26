import Chatbot from './components/Chatbot/Chatbot';
import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent } from '@/components/ui/card.jsx'
import { Heart, Activity, FileText, AlertTriangle } from 'lucide-react'
import logo from './assets/logo2.png'
import './App.css'

// صفحة الحالة المرضية
import MedicalCase from './components/MedicalCase'
// صفحة حالة الإصابة
import InjuryCase from './components/InjuryCase'
// صفحة حالة الإنعاش
import ResuscitationCase from './components/ResuscitationCase'
// صفحة حالة الوفاة
import DeathCase from './components/DeathCase'

// الصفحة الرئيسية
function HomePage() {
  const navigate = useNavigate()

  const caseTypes = [
    {
      id: 'medical',
      title: 'حالة مرضية',
      titleEn: 'Medical Case',
      description: 'إنشاء تقرير للحالات المرضية والأعراض',
      descriptionEn: 'Create reports for medical conditions and symptoms',
      icon: Heart,
      color: 'bg-red-500',
      route: '/medical'
    },
    {
      id: 'injury',
      title: 'حالة إصابة',
      titleEn: 'Trauma Case',
      description: 'تقرير للحوادث والإصابات',
      descriptionEn: 'Reports for accidents and injuries',
      icon: AlertTriangle,
      color: 'bg-orange-500',
      route: '/injury'
    },
    {
      id: 'resuscitation',
      title: 'حالة إنعاش',
      titleEn: 'Resuscitation Case',
      description: 'تقرير لحالات الإنعاش القلبي الرئوي',
      descriptionEn: 'Reports for cardiopulmonary resuscitation cases',
      icon: Activity,
      color: 'bg-blue-500',
      route: '/resuscitation'
    },
    {
      id: 'death',
      title: 'حالة وفاة',
      titleEn: 'Death Case',
      description: 'تقرير لحالات الوفاة',
      descriptionEn: 'Reports for death cases',
      icon: FileText,
      color: 'bg-gray-600',
      route: '/death'
    }
  ]

  return (
    <div className="min-h-screen red-crescent-bg">
      {/* الهيدر */}
      <header className="text-center py-12 text-white">
        <div className="container mx-auto px-4">
          {/* الشعار */}
          <div className="mb-8 fade-in">
            <img 
              src={logo} 
              alt="شعار الهلال الأحمر السعودي" 
              className="w-32 h-32 mx-auto rounded-full shadow-2xl crescent-icon"
            />
          </div>
          
          {/* العنوان الرئيسي */}
          <h1 className="text-5xl md:text-6xl font-bold mb-4 arabic-font fade-in">
            المساعد الميداني
          </h1>
          <h2 className="text-2xl md:text-3xl font-light mb-2 arabic-font fade-in">
            Field Assistant
          </h2>
          
          {/* العنوان الفرعي */}
          <p className="text-xl md:text-2xl font-medium arabic-font fade-in">
            جهدنا هذا لخدمتكم، فاذكرونا بدعوة
          </p>
          <p className="text-lg md:text-xl font-light fade-in">
            At your service, ambassador of life
          </p>
        </div>
      </header>

      {/* قسم البطاقات */}
      <main className="container mx-auto px-4 pb-16">
        <div className="cards-grid">
          {caseTypes.map((caseType, index) => {
            const IconComponent = caseType.icon
            return (
              <Card 
                key={caseType.id} 
                className="red-crescent-card scale-hover fade-in shadow-xl"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-8 text-center">
                  {/* الأيقونة */}
                  <div className={`w-20 h-20 ${caseType.color} rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                    <IconComponent className="w-10 h-10 text-white" />
                  </div>
                  
                  {/* العنوان */}
                  <h3 className="text-2xl font-bold mb-2 arabic-font rtl text-gray-800">
                    {caseType.title}
                  </h3>
                  <h4 className="text-lg font-semibold mb-4 ltr text-gray-600">
                    {caseType.titleEn}
                  </h4>
                  
                  {/* الوصف */}
                  <p className="text-gray-600 mb-4 arabic-font rtl">
                    {caseType.description}
                  </p>
                  <p className="text-gray-500 mb-6 ltr text-sm">
                    {caseType.descriptionEn}
                  </p>
                  
                  {/* زر البدء */}
                  <Button 
                    onClick={() => navigate(caseType.route)}
                    className="red-crescent-button text-white px-8 py-3 rounded-lg font-bold arabic-font w-full"
                  >
                    <span className="rtl">ابدأ التقرير</span>
                    <span className="ltr text-sm">Start Report</span>
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </main>

      {/* الفوتر */}
      <footer className="bg-white/10 backdrop-blur-sm border-t border-white/20 py-12 text-white">
  <div className="container mx-auto px-4">
    <div className="flex flex-col items-center justify-center space-y-6 text-center">
      {/* مساعدات التطوير */}
      <div className="bg-white/5 rounded-xl p-6 max-w-2xl mx-auto border border-white/10">
        <h3 className="text-xl font-bold mb-3 arabic-font rtl text-white text-center">
          إعداد وتنفيذ
        </h3>
        <p className="text-lg arabic-font rtl text-white/90 mb-2 text-center">
          عمار الهندي - سامي الفيفي ( قطاع شمال جدة )
        </p>
        <p className="text-sm ltr text-white/70 text-center">
          Developed by: Ammar Al-Hindi - Sami Al-Faifi (North Jeddah Sector)
        </p>
      </div>
            
            {/* رسالة الاستخدام */}
            <div className="bg-white/5 rounded-xl p-6 max-w-3xl mx-auto border border-white/10">
              <div className="flex items-center justify-center mb-3">
                <FileText className="w-6 h-6 text-white/80 ml-2" />
                <h4 className="text-lg font-semibold arabic-font rtl text-white">
                  ملاحظة مهمة
                </h4>
              </div>
              <p className="text-base arabic-font rtl text-white/90 leading-relaxed mb-3">
                تم صنع هذا المساعد لمساعدتكم في كتابة التقارير الإسعافية بطريقة احترافية ودقيقة
              </p>
              <p className="text-sm arabic-font rtl text-white/80 mb-2">
                استخدام هذا المساعد اختياري ويهدف إلى تسهيل عملكم وتوفير الوقت
              </p>
              <p className="text-xs ltr text-white/70">
                This assistant was created to help you write professional and accurate emergency reports. Its use is optional and aims to facilitate your work and save time.
              </p>
            </div>
            
            {/* حقوق النشر */}
            <div className="pt-4 border-t border-white/20">
              <p className="text-xs text-white/60">
                © 2025 مساعد التقارير الإسعافية - جميع الحقوق محفوظة
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

// التطبيق الرئيسي مع التوجيه
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/medical" element={<MedicalCase />} />
          <Route path="/injury" element={<InjuryCase />} />
          <Route path="/resuscitation" element={<ResuscitationCase />} />
          <Route path="/death" element={<DeathCase />} />
        </Routes>
      </div>
    </Router>
  )
}





export default function App() {
  return <><AppWrapper /><Chatbot /></>;
}