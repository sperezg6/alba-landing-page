"use client";

import { TimelineContent } from "@/components/ui/timeline-animation";
import { VerticalCutReveal } from "@/components/ui/vertical-cut-reveal";
import { ArrowRight, BookOpen, FileText, Video } from "lucide-react";
import { useRef } from "react";
import { Link } from "@/i18n/navigation";

export default function ResourcesHeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);

  const revealVariants = {
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        delay: i * 0.4,
        duration: 0.5,
      },
    }),
    hidden: {
      filter: "blur(10px)",
      y: -20,
      opacity: 0,
    },
  };

  const scaleVariants = {
    visible: (i: number) => ({
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        delay: i * 0.4,
        duration: 0.5,
      },
    }),
    hidden: {
      filter: "blur(10px)",
      opacity: 0,
    },
  };

  return (
    <section className="relative py-12 md:py-16 lg:py-20 px-6 md:px-12 lg:px-16 xl:px-24 bg-alba-dark overflow-hidden" ref={heroRef}>
      {/* Decorative gradient blob */}
      <div
        className="absolute -bottom-32 -right-32 w-[500px] h-[500px] opacity-25 pointer-events-none"
        style={{ backgroundImage: 'url(/gradient-blob.png)', backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }}
      />
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="relative">
          {/* Header with resource type icons */}
          <div className="flex justify-between items-center mb-8 w-full md:w-[85%] absolute lg:top-4 md:top-0 sm:-top-2 -top-3 z-10">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-alba-primary" />
              <TimelineContent
                as="span"
                animationNum={0}
                timelineRef={heroRef}
                customVariants={revealVariants}
                className="text-xs font-medium text-alba-primary uppercase tracking-[0.2em]"
              >
                Centro de Recursos
              </TimelineContent>
            </div>
            <div className="flex gap-3">
              <TimelineContent
                as="div"
                animationNum={0}
                timelineRef={heroRef}
                customVariants={revealVariants}
                className="md:w-10 md:h-10 sm:w-8 w-6 sm:h-8 h-6 border border-black/20 bg-black/5 backdrop-blur-sm rounded-lg flex items-center justify-center"
              >
                <BookOpen className="w-4 h-4 md:w-5 md:h-5 text-alba-primary" />
              </TimelineContent>
              <TimelineContent
                as="div"
                animationNum={1}
                timelineRef={heroRef}
                customVariants={revealVariants}
                className="md:w-10 md:h-10 sm:w-8 w-6 sm:h-8 h-6 border border-black/20 bg-black/5 backdrop-blur-sm rounded-lg flex items-center justify-center"
              >
                <FileText className="w-4 h-4 md:w-5 md:h-5 text-alba-primary" />
              </TimelineContent>
              <TimelineContent
                as="div"
                animationNum={2}
                timelineRef={heroRef}
                customVariants={revealVariants}
                className="md:w-10 md:h-10 sm:w-8 w-6 sm:h-8 h-6 border border-black/20 bg-black/5 backdrop-blur-sm rounded-lg flex items-center justify-center"
              >
                <Video className="w-4 h-4 md:w-5 md:h-5 text-alba-primary" />
              </TimelineContent>
            </div>
          </div>

          <TimelineContent
            as="figure"
            animationNum={4}
            timelineRef={heroRef}
            customVariants={scaleVariants}
            className="relative group"
          >
            <svg
              className="w-full"
              width={"100%"}
              height={"100%"}
              viewBox="0 0 100 40"
            >
              <defs>
                <clipPath
                  id="clip-inverted-resources"
                  clipPathUnits={"objectBoundingBox"}
                >
                  <path
                    d="M0.0998072 1H0.422076H0.749756C0.767072 1 0.774207 0.961783 0.77561 0.942675V0.807325C0.777053 0.743631 0.791844 0.731953 0.799059 0.734076H0.969813C0.996268 0.730255 1.00088 0.693206 0.999875 0.675159V0.0700637C0.999875 0.0254777 0.985045 0.00477707 0.977629 0H0.902473C0.854975 0 0.890448 0.138535 0.850165 0.138535H0.0204424C0.00408849 0.142357 0 0.180467 0 0.199045V0.410828C0 0.449045 0.0136283 0.46603 0.0204424 0.469745H0.0523086C0.0696245 0.471019 0.0735527 0.497877 0.0733523 0.511146V0.915605C0.0723903 0.983121 0.090588 1 0.0998072 1Z"
                    fill="#D9D9D9"
                  />
                </clipPath>
              </defs>
              <image
                clipPath="url(#clip-inverted-resources)"
                preserveAspectRatio="xMidYMid slice"
                width={"100%"}
                height={"100%"}
                xlinkHref="/images/equipo-alba.jpg"
              />
            </svg>
          </TimelineContent>

          {/* Stats */}
          <div className="flex flex-wrap lg:justify-start justify-between items-center py-4 text-sm">
            <TimelineContent
              as="div"
              animationNum={5}
              timelineRef={heroRef}
              customVariants={revealVariants}
              className="flex gap-4"
            >
              <div className="flex items-center gap-2 mb-2 sm:text-base text-xs">
                <span className="text-alba-primary font-bold">25+</span>
                <span className="text-gray-900/70">años de experiencia</span>
                <span className="text-black/20">|</span>
              </div>
              <div className="flex items-center gap-2 mb-2 sm:text-base text-xs">
                <span className="text-alba-primary font-bold">50+</span>
                <span className="text-gray-900/70">recursos disponibles</span>
              </div>
            </TimelineContent>
            <div className="lg:absolute right-0 bottom-16 flex lg:flex-col flex-row-reverse lg:gap-0 gap-4">
              <TimelineContent
                as="div"
                animationNum={6}
                timelineRef={heroRef}
                customVariants={revealVariants}
                className="flex lg:text-4xl sm:text-3xl text-2xl items-center gap-2 mb-2"
              >
                <span className="text-alba-primary font-semibold">5,000+</span>
                <span className="text-gray-900/70 uppercase">pacientes</span>
              </TimelineContent>
              <TimelineContent
                as="div"
                animationNum={7}
                timelineRef={heroRef}
                customVariants={revealVariants}
                className="flex items-center gap-2 mb-2 sm:text-base text-xs"
              >
                <span className="text-alba-primary font-bold">3</span>
                <span className="text-gray-900/70">clínicas en el Bajío</span>
                <span className="text-black/20 lg:hidden block">|</span>
              </TimelineContent>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-3 gap-8 mt-4">
          <div className="md:col-span-2">
            <h1 className="sm:text-4xl md:text-5xl lg:text-6xl text-2xl !leading-[0.95] font-light !text-gray-900 mb-8">
              <VerticalCutReveal
                splitBy="words"
                staggerDuration={0.1}
                staggerFrom="first"
                reverse={true}
                transition={{
                  type: "spring",
                  stiffness: 250,
                  damping: 30,
                  delay: 3,
                }}
              >
                Información y recursos para tu bienestar renal.
              </VerticalCutReveal>
            </h1>

            <TimelineContent
              as="div"
              animationNum={9}
              timelineRef={heroRef}
              customVariants={revealVariants}
              className="grid md:grid-cols-2 gap-8"
            >
              <TimelineContent
                as="div"
                animationNum={10}
                timelineRef={heroRef}
                customVariants={revealVariants}
                className="sm:text-base text-sm"
              >
                <p className="leading-relaxed text-gray-900/60">
                  Entendemos que el conocimiento es poder. Por eso hemos creado
                  esta sección con información práctica y recursos educativos
                  para pacientes y familiares.
                </p>
              </TimelineContent>
              <TimelineContent
                as="div"
                animationNum={11}
                timelineRef={heroRef}
                customVariants={revealVariants}
                className="sm:text-base text-sm"
              >
                <p className="leading-relaxed text-gray-900/60">
                  Desde guías de alimentación hasta consejos para el día a día,
                  aquí encontrarás todo lo necesario para complementar tu
                  tratamiento de diálisis.
                </p>
              </TimelineContent>
            </TimelineContent>
          </div>

          <div className="md:col-span-1">
            <div className="text-right">
              <TimelineContent
                as="div"
                animationNum={12}
                timelineRef={heroRef}
                customVariants={revealVariants}
                className="text-alba-primary text-2xl font-bold mb-2"
              >
                ALBA
              </TimelineContent>
              <TimelineContent
                as="div"
                animationNum={13}
                timelineRef={heroRef}
                customVariants={revealVariants}
                className="text-gray-900/50 text-sm mb-8"
              >
                Centro de Diálisis | Cuidado Renal
              </TimelineContent>

              <TimelineContent
                as="div"
                animationNum={14}
                timelineRef={heroRef}
                customVariants={revealVariants}
                className="mb-6"
              >
                <p className="text-gray-900 font-medium mb-4">
                  ¿Tienes dudas sobre tu tratamiento o cuidado renal?
                </p>
              </TimelineContent>

              <TimelineContent
                as="div"
                animationNum={15}
                timelineRef={heroRef}
                customVariants={revealVariants}
              >
                <Link
                  href="/contacto"
                  className="bg-alba-primary hover:bg-alba-primary-dark flex w-fit ml-auto gap-2 hover:gap-4 transition-all duration-300 ease-in-out text-black px-6 py-3 rounded-sm cursor-pointer font-semibold text-sm uppercase tracking-wider"
                >
                  Contáctanos <ArrowRight className="w-4 h-4" />
                </Link>
              </TimelineContent>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
