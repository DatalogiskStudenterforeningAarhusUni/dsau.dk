import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import photosData from "../data/photos.json";
import Photo from "../components/Photo";
import { useI18n } from "../i18n/I18nContext";
import Seo from "../components/Seo";

export default function Gallery() {
  const { t } = useI18n();
  const navigate = useNavigate();

  const { year: selectedYear, event: selectedEvent } = useParams<{ year: string; event: string }>();

  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null); 

  const currentYearData = photosData.find((y) => String(y.year) === selectedYear);
  
  const decodedEventName = selectedEvent ? decodeURIComponent(selectedEvent) : null;
  const currentEventData = currentYearData?.events.find((e) => e.name === decodedEventName);

  const goToYear = (year: string) => navigate(`${year}`); 
  const goToEvent = (event: string) => navigate(`${encodeURIComponent(event)}`);
  
  const handleBack = () => navigate(-1);

  return (
    <div className="container mx-auto px-4 py-8 relative">
          {fullscreenImage && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm cursor-zoom-out p-4 md:p-8"
        onClick={() => setFullscreenImage(null)}>
        <img
          src={fullscreenImage}
          className="w-full h-full object-contain shadow-2xl animate-in zoom-in-95 duration-300"
        />
      </div>)} 
      <div className="flex justify-between items-center mb-4">
        <Seo titleKey="gallery.title" descriptionKey="gallery.intro" />
        <h1 className="text-3xl font-bold text-foreground dark:text-white flex items-center gap-2">
          <span className="cursor-pointer" onClick={() => {}}>{t('gallery.title')}</span>
          {selectedYear && (
            <>
              <span className="text-neutral-400 font-light">/</span>
              <span className="text-foreground cursor-pointer" onClick={() => goToYear(selectedYear)}>
                {selectedYear}
              </span>
            </>
          )}
          {decodedEventName && (
            <>
              <span className="text-neutral-400 font-light">/</span>
              <span className="text-foreground">
                {decodedEventName}
              </span>
            </>
          )}
        </h1>
        
        
        {(selectedYear || selectedEvent) && (
          <button onClick={handleBack} className="px-4 py-2 bg-neutral-200 dark:bg-neutral-800 rounded-md">
            ← {t('common.back')}
          </button>
        )}
      </div>
      <p className="text-neutral-700 dark:text-neutral-300 mb-6">{t('gallery.intro')}</p>

      <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {selectedYear && decodedEventName ? (
          currentEventData?.photos.map((url, index) => (
            <div key={index} onClick={() => setFullscreenImage(url)} className="cursor-pointer">
              <Photo image={url} />
            </div>
          ))
        ) : 
        selectedYear ? (
          currentYearData?.events.map((event) => (
            <div key={event.name} onClick={() => goToEvent(event.name)} className="cursor-pointer">
              <Photo text={event.name} image={event.cover} />
            </div>
          ))
        ) : 
        (
          photosData.map((d) => (
            <div key={d.year} onClick={() => goToYear(String(d.year))} className="cursor-pointer">
              <Photo text={d.year} image={d.cover} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}