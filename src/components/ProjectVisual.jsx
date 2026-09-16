const Bar = ({ className = '', style }) => (
  <div className={`h-2 rounded bg-[#E7E1F4] ${className}`} style={style} />
)
const Box = ({ className = '', style }) => (
  <div className={`rounded-md border border-mistLine bg-paperTint ${className}`} style={style} />
)
const Dot = ({ className = '' }) => <div className={`h-5 w-5 flex-none rounded-full bg-lilac ${className}`} />

function PhoneFrame({ children }) {
  return (
    <div className="relative z-10 h-full max-h-[190px] w-[118px] rounded-[22px] border-[5px] border-[#1B1330] bg-white p-3 shadow-[0_20px_40px_rgba(18,10,38,0.32)]">
      <div className="mx-auto mb-3 h-[5px] w-[30px] rounded bg-[#1B1330]" />
      {children}
    </div>
  )
}

function BrowserFrame({ children }) {
  return (
    <div className="relative z-10 w-[96%] max-w-[320px] overflow-hidden rounded-xl bg-white pb-3 shadow-[0_20px_40px_rgba(18,10,38,0.32)]">
      <div className="flex h-5 items-center gap-1.5 rounded-t-xl bg-[#EFEAF8] px-2.5">
        <i className="h-1.5 w-1.5 rounded-full bg-[#D8CFEE]" />
        <i className="h-1.5 w-1.5 rounded-full bg-[#D8CFEE]" />
        <i className="h-1.5 w-1.5 rounded-full bg-[#D8CFEE]" />
      </div>
      <div className="px-3.5 py-3">{children}</div>
    </div>
  )
}

/**
 * Renders a small abstract mockup appropriate to the project "kind".
 * These are stand-ins for real screenshots — swap with actual project
 * imagery when available.
 */
export default function ProjectVisual({ kind }) {
  switch (kind) {
    case 'phone-checklist':
      return (
        <PhoneFrame>
          <div className="mb-3.5 flex items-center gap-2">
            <Dot className="-mr-2.5" />
            <Dot className="bg-violet" />
            <Bar className="ml-1.5 w-9 bg-violet" />
          </div>
          <div className="mb-2 flex items-center gap-2">
            <Box className="h-4 w-4 border-violet" />
            <Bar className="w-[70%]" />
          </div>
          <div className="mb-2 flex items-center gap-2">
            <Box className="h-4 w-4 border-lilac bg-lilac" />
            <Bar className="w-[55%] bg-lilac" />
          </div>
          <div className="flex items-center gap-2">
            <Box className="h-4 w-4" />
            <Bar className="w-[62%]" />
          </div>
        </PhoneFrame>
      )

    case 'browser-dashboard':
      return (
        <BrowserFrame>
          <div className="flex gap-3">
            <div className="flex w-[26%] flex-col gap-1.5">
              <Bar className="w-[80%] bg-violet" />
              <Bar className="w-[60%]" />
              <Bar className="w-[70%]" />
              <Bar className="w-1/2" />
            </div>
            <div className="flex flex-1 flex-col gap-1.5">
              <div className="flex items-center gap-1.5">
                <Bar className="w-[30%] bg-violet" />
                <Bar className="w-[45%]" />
                <Bar className="w-[15%]" />
              </div>
              <div className="flex items-center gap-1.5">
                <Bar className="w-[30%]" />
                <Bar className="w-[45%]" />
                <Bar className="w-[15%] bg-lilac" />
              </div>
              <div className="mt-1 flex h-9 items-end gap-1">
                {[40, 70, 55, 90, 35].map((h, i) => (
                  <div key={i} className="flex-1 rounded-t-sm bg-lilac" style={{ height: `${h}%` }} />
                ))}
              </div>
            </div>
          </div>
        </BrowserFrame>
      )

    case 'phone-onboarding':
      return (
        <PhoneFrame>
          <div className="flex h-full flex-col">
            <div
              className="mb-2.5 flex-1 rounded-full"
              style={{ background: 'linear-gradient(135deg,#EDE7FA,#C9B8EE)' }}
            />
            <div className="my-2.5 flex justify-center gap-1.5">
              <span className="h-1.5 w-4 rounded-sm bg-violet" />
              <span className="h-1.5 w-1.5 rounded-full bg-mistLine" />
              <span className="h-1.5 w-1.5 rounded-full bg-mistLine" />
            </div>
            <div className="h-6.5 h-[26px] rounded-full bg-violet" />
          </div>
        </PhoneFrame>
      )

    case 'phone-finance':
      return (
        <PhoneFrame>
          <div
            className="mb-3 flex h-[50px] flex-col justify-between rounded-lg p-2.5"
            style={{ background: 'linear-gradient(135deg,#5A3E8E,#2E2150)' }}
          >
            <Bar className="w-[40%] bg-white/45" />
            <Bar className="h-2.5 w-[65%] bg-white" />
          </div>
          <div className="mb-2 flex items-center gap-2">
            <Dot className="h-4 w-4" />
            <Bar className="w-[40%]" />
            <Bar className="ml-auto w-[20%] bg-lilac" />
          </div>
          <div className="flex items-center gap-2">
            <Dot className="h-4 w-4" />
            <Bar className="w-[35%]" />
            <Bar className="ml-auto w-[18%]" />
          </div>
        </PhoneFrame>
      )

    case 'browser-grid':
      return (
        <BrowserFrame>
          <div className="mb-2.5 grid grid-cols-4 gap-1.5">
            {[0, 1, 2, 3].map((i) => (
              <Box key={i} className="aspect-square" />
            ))}
          </div>
          <div className="flex items-center gap-1.5">
            <Bar className="w-[24%] bg-violet" />
            <Bar className="ml-auto w-[12%] bg-lilac" />
          </div>
        </BrowserFrame>
      )

    case 'browser-hero':
      return (
        <BrowserFrame>
          <div className="flex flex-col items-center text-center">
            <div
              className="mb-2.5 h-[38px] w-full rounded-lg"
              style={{ background: 'linear-gradient(135deg,#EDE7FA,#C9B8EE)' }}
            />
            <Bar className="mx-auto mb-2 h-[9px] w-[40%] bg-lilac" />
            <Bar className="mx-auto mb-3 w-[60%]" />
            <div className="mx-auto h-[26px] w-[76px] rounded-full bg-violet" />
          </div>
        </BrowserFrame>
      )

    case 'browser-split':
      return (
        <BrowserFrame>
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <Bar className="mb-2 h-[11px] w-[80%] bg-violet" />
              <Bar className="mb-3 w-[60%]" />
              <div className="h-[26px] w-[68px] rounded-full bg-violet" />
            </div>
            <div
              className="h-[62px] w-[38%] rounded-md"
              style={{ background: 'linear-gradient(135deg,#EDE7FA,#C9B8EE)' }}
            />
          </div>
        </BrowserFrame>
      )

    default:
      return null
  }
}
