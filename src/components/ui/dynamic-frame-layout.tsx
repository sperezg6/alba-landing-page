"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import Image from "next/image"

interface Frame {
  id: number
  media: string // Can be video URL or image path
  mediaType?: 'video' | 'image'
  title?: string
  description?: string
  defaultPos: { x: number; y: number; w: number; h: number }
  corner?: string
  edgeHorizontal?: string
  edgeVertical?: string
  mediaSize?: number
  borderThickness?: number
  borderSize?: number
  isHovered?: boolean
}

interface FrameComponentProps {
  media: string
  mediaType: 'video' | 'image'
  title?: string
  description?: string
  width: number | string
  height: number | string
  className?: string
  corner?: string
  edgeHorizontal?: string
  edgeVertical?: string
  mediaSize: number
  borderThickness?: number
  borderSize?: number
  showFrame: boolean
  isHovered: boolean
}

function FrameComponent({
  media,
  mediaType,
  title,
  description,
  width,
  height,
  className = "",
  corner,
  edgeHorizontal,
  edgeVertical,
  mediaSize,
  borderThickness = 4,
  borderSize = 90,
  showFrame,
  isHovered,
}: FrameComponentProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (mediaType === 'video') {
      if (isHovered) {
        videoRef.current?.play()
      } else {
        videoRef.current?.pause()
      }
    }
  }, [isHovered, mediaType])

  return (
    <div
      className={`relative ${className}`}
      style={{
        width,
        height,
        transition: "width 0.3s ease-in-out, height 0.3s ease-in-out",
      }}
    >
      <div className="relative w-full h-full overflow-hidden">
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            zIndex: 1,
            transition: "all 0.3s ease-in-out",
            padding: showFrame ? `${borderThickness}px` : "0",
            width: showFrame ? `${borderSize}%` : "100%",
            height: showFrame ? `${borderSize}%` : "100%",
            left: showFrame ? `${(100 - borderSize) / 2}%` : "0",
            top: showFrame ? `${(100 - borderSize) / 2}%` : "0",
          }}
        >
          <div
            className="w-full h-full overflow-hidden"
            style={{
              transform: `scale(${mediaSize})`,
              transformOrigin: "center",
              transition: "transform 0.3s ease-in-out",
            }}
          >
            {mediaType === 'video' ? (
              <video
                className="w-full h-full object-cover"
                src={media}
                loop
                muted
                playsInline
                ref={videoRef}
              />
            ) : (
              <>
                <Image
                  src={media}
                  alt={title || "Service image"}
                  fill
                  className="object-cover transition-transform duration-500"
                  style={{
                    transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                  }}
                />
                {/* Dark overlay on images */}
                <div
                  className="absolute inset-0 bg-black transition-opacity duration-300"
                  style={{
                    opacity: isHovered ? 0.2 : 0.5,
                  }}
                />
              </>
            )}
          </div>
        </div>

        {/* Overlay with title */}
        {(title || description) && (
          <div
            className="absolute inset-0 z-10 flex flex-col justify-end p-5 md:p-8 transition-opacity duration-300"
            style={{
              background: isHovered
                ? 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.5) 50%, transparent 100%)'
                : 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 40%, transparent 70%)',
            }}
          >
            {title && (
              <h3
                className="!text-white font-bold text-xl md:text-2xl lg:text-3xl transition-transform duration-300 drop-shadow-lg"
                style={{
                  transform: isHovered ? 'translateY(0)' : 'translateY(4px)',
                  textShadow: '0 2px 8px rgba(0,0,0,0.7)',
                }}
              >
                {title}
              </h3>
            )}
            {description && (
              <p
                className="!text-white/90 text-sm md:text-base lg:text-lg mt-2 md:mt-3 line-clamp-3 transition-all duration-300 font-medium"
                style={{
                  opacity: isHovered ? 1 : 0.7,
                  transform: isHovered ? 'translateY(0)' : 'translateY(8px)',
                  textShadow: '0 1px 4px rgba(0,0,0,0.5)',
                }}
              >
                {description}
              </p>
            )}
          </div>
        )}

        {showFrame && corner && edgeHorizontal && edgeVertical && (
          <div className="absolute inset-0" style={{ zIndex: 2 }}>
            <div
              className="absolute top-0 left-0 w-16 h-16 bg-contain bg-no-repeat"
              style={{ backgroundImage: `url(${corner})` }}
            />
            <div
              className="absolute top-0 right-0 w-16 h-16 bg-contain bg-no-repeat"
              style={{ backgroundImage: `url(${corner})`, transform: "scaleX(-1)" }}
            />
            <div
              className="absolute bottom-0 left-0 w-16 h-16 bg-contain bg-no-repeat"
              style={{ backgroundImage: `url(${corner})`, transform: "scaleY(-1)" }}
            />
            <div
              className="absolute bottom-0 right-0 w-16 h-16 bg-contain bg-no-repeat"
              style={{ backgroundImage: `url(${corner})`, transform: "scale(-1, -1)" }}
            />

            <div
              className="absolute top-0 left-16 right-16 h-16"
              style={{
                backgroundImage: `url(${edgeHorizontal})`,
                backgroundSize: "auto 64px",
                backgroundRepeat: "repeat-x",
              }}
            />
            <div
              className="absolute bottom-0 left-16 right-16 h-16"
              style={{
                backgroundImage: `url(${edgeHorizontal})`,
                backgroundSize: "auto 64px",
                backgroundRepeat: "repeat-x",
                transform: "rotate(180deg)",
              }}
            />
            <div
              className="absolute left-0 top-16 bottom-16 w-16"
              style={{
                backgroundImage: `url(${edgeVertical})`,
                backgroundSize: "64px auto",
                backgroundRepeat: "repeat-y",
              }}
            />
            <div
              className="absolute right-0 top-16 bottom-16 w-16"
              style={{
                backgroundImage: `url(${edgeVertical})`,
                backgroundSize: "64px auto",
                backgroundRepeat: "repeat-y",
                transform: "scaleX(-1)",
              }}
            />
          </div>
        )}
      </div>
    </div>
  )
}

interface DynamicFrameLayoutProps {
  frames: Frame[]
  className?: string
  showFrames?: boolean
  hoverSize?: number
  gapSize?: number
  rows?: number
  cols?: number
}

export function DynamicFrameLayout({
  frames: initialFrames,
  className,
  showFrames = false,
  hoverSize = 6,
  gapSize = 4,
  rows = 3,
  cols = 3,
}: DynamicFrameLayoutProps) {
  const [frames] = useState<Frame[]>(initialFrames)
  const [hovered, setHovered] = useState<{ row: number; col: number } | null>(null)

  const getRowSizes = () => {
    if (hovered === null) return Array(rows).fill('1fr').join(' ')
    const { row } = hovered
    const totalFr = rows * 4
    const nonHoveredSize = (totalFr - hoverSize) / (rows - 1)
    return Array.from({ length: rows }, (_, r) => (r === row ? `${hoverSize}fr` : `${nonHoveredSize}fr`)).join(" ")
  }

  const getColSizes = () => {
    if (hovered === null) return Array(cols).fill('1fr').join(' ')
    const { col } = hovered
    const totalFr = cols * 4
    const nonHoveredSize = (totalFr - hoverSize) / (cols - 1)
    return Array.from({ length: cols }, (_, c) => (c === col ? `${hoverSize}fr` : `${nonHoveredSize}fr`)).join(" ")
  }

  const getTransformOrigin = (x: number, y: number) => {
    const vertical = y === 0 ? "top" : y === 4 ? "center" : "bottom"
    const horizontal = x === 0 ? "left" : x === 4 ? "center" : "right"
    return `${vertical} ${horizontal}`
  }

  return (
    <div
      className={`relative w-full h-full ${className}`}
      style={{
        display: "grid",
        gridTemplateRows: getRowSizes(),
        gridTemplateColumns: getColSizes(),
        gap: `${gapSize}px`,
        transition: "grid-template-rows 0.4s ease, grid-template-columns 0.4s ease",
      }}
    >
      {frames.map((frame, index) => {
        const row = Math.floor(index / cols)
        const col = index % cols
        const transformOrigin = getTransformOrigin(frame.defaultPos.x, frame.defaultPos.y)

        return (
          <motion.div
            key={frame.id}
            className="relative cursor-pointer"
            style={{
              transformOrigin,
              transition: "transform 0.4s ease",
            }}
            onMouseEnter={() => setHovered({ row, col })}
            onMouseLeave={() => setHovered(null)}
          >
            <FrameComponent
              media={frame.media}
              mediaType={frame.mediaType || 'image'}
              title={frame.title}
              description={frame.description}
              width="100%"
              height="100%"
              className="absolute inset-0"
              corner={frame.corner}
              edgeHorizontal={frame.edgeHorizontal}
              edgeVertical={frame.edgeVertical}
              mediaSize={frame.mediaSize || 1}
              borderThickness={frame.borderThickness}
              borderSize={frame.borderSize}
              showFrame={showFrames}
              isHovered={hovered?.row === row && hovered?.col === col}
            />
          </motion.div>
        )
      })}
    </div>
  )
}

export type { Frame, DynamicFrameLayoutProps }
