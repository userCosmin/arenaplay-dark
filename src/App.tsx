import { Suspense, lazy, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { initAnalytics, trackPageView } from '@/utils/analytics';

const HomePage = lazy(() => import('@/pages/HomePage'));
const PetreceriPage = lazy(() => import('@/pages/petreceri/PetreceriPage'));
const PetreceriPachetePage = lazy(() => import('@/pages/petreceri/PetreceriPachetePage'));
const PlaygroundPage = lazy(() => import('@/pages/playground/PlaygroundPage'));
const PlaygroundActivitatiPage = lazy(() => import('@/pages/playground/PlaygroundActivitatiPage'));
const PlaygroundTarifeProgramPage = lazy(() => import('@/pages/playground/PlaygroundTarifeProgramPage'));
const AfterschoolPage = lazy(() => import('@/pages/afterschool/AfterschoolPage'));
const AfterschoolProgramPage = lazy(() => import('@/pages/afterschool/AfterschoolProgramPage'));
const AfterschoolInscrieriPage = lazy(() => import('@/pages/afterschool/AfterschoolInscrieriPage'));
const ArenaMobilaPage = lazy(() => import('@/pages/arena-mobila/ArenaMobilaPage'));
const ArenaMobilaScoliPage = lazy(() => import('@/pages/arena-mobila/ArenaMobilaScoliPage'));
const ArenaMobilaEvenimentePage = lazy(() => import('@/pages/arena-mobila/ArenaMobilaEvenimentePage'));
const ArenaMobilaPetreceriPrivatePage = lazy(() => import('@/pages/arena-mobila/ArenaMobilaPetreceriPrivatePage'));
const ArenaMobilaSolicitaOfertaPage = lazy(() => import('@/pages/arena-mobila/ArenaMobilaSolicitaOfertaPage'));
const DespreNoiPage = lazy(() => import('@/pages/DespreNoiPage'));
const ContactPage = lazy(() => import('@/pages/ContactPage'));
const RezervaPage = lazy(() => import('@/pages/RezervaPage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));

function PageLoader() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-ink-200 border-t-brand-500" role="status" aria-label="Se încarcă" />
    </div>
  );
}

function AnalyticsBoot() {
  const location = useLocation();

  useEffect(() => {
    initAnalytics();
  }, []);

  useEffect(() => {
    trackPageView(location.pathname);
  }, [location.pathname]);

  return null;
}

export default function App() {
  return (
    <Layout>
      <AnalyticsBoot />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/petreceri-vr/" element={<PetreceriPage />} />
          <Route path="/petreceri-vr/pachete/" element={<PetreceriPachetePage />} />

          <Route path="/loc-de-joaca/" element={<PlaygroundPage />} />
          <Route path="/loc-de-joaca/activitati/" element={<PlaygroundActivitatiPage />} />
          <Route path="/loc-de-joaca/tarife-program/" element={<PlaygroundTarifeProgramPage />} />

          <Route path="/afterschool/" element={<AfterschoolPage />} />
          <Route path="/afterschool/program/" element={<AfterschoolProgramPage />} />
          <Route path="/afterschool/inscrieri/" element={<AfterschoolInscrieriPage />} />

          <Route path="/arena-vr-mobila/" element={<ArenaMobilaPage />} />
          <Route path="/arena-vr-mobila/scoli/" element={<ArenaMobilaScoliPage />} />
          <Route path="/arena-vr-mobila/evenimente/" element={<ArenaMobilaEvenimentePage />} />
          <Route path="/arena-vr-mobila/petreceri-private/" element={<ArenaMobilaPetreceriPrivatePage />} />
          <Route path="/arena-vr-mobila/solicita-oferta/" element={<ArenaMobilaSolicitaOfertaPage />} />

          <Route path="/despre-noi/" element={<DespreNoiPage />} />
          <Route path="/contact/" element={<ContactPage />} />
          <Route path="/rezerva/" element={<RezervaPage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}
