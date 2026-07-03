import decorativeVector from '../../assets/icons/Vectors.png'

type DecorativeVectorProps = {
  className?: string
  flip?: boolean
  src?: string
}

export function DecorativeVector({
  className = '',
  flip = false,
  src = decorativeVector,
}: DecorativeVectorProps) {
  return (
    <img
      src={src}
      alt=""
      aria-hidden
      className={`pointer-events-none hidden h-auto w-16 opacity-90 lg:block xl:w-20 2xl:w-24 ${flip ? 'scale-x-[-1]' : ''} ${className}`.trim()}
    />
  )
}
