'use client'

import { useEffect, useMemo, useState } from 'react'
import {
  PHASES,
  MACROS,
  DAILY_HABITS,
  MEALS,
  CHECKPOINTS,
  type Phase,
} from '@/lib/fitness-program'

const START_WEIGHT = 120.1
const GOAL_WEIGHT = 96
const WEEK12_TARGET = 106
const STORAGE_KEY = 'wameed-fitness-v1'

type Store = {
  weights: { date: string; kg: number }[]
  habits: Record<string, string[]> // date -> habit ids done
  lifts: Record<string, string> // `${sessionId}:${exerciseIndex}` -> logged text
}

const EMPTY: Store = { weights: [], habits: {}, lifts: {} }

function load(): Store {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return EMPTY
    const parsed = JSON.parse(raw) as Partial<Store>
    return {
      weights: Array.isArray(parsed.weights) ? parsed.weights : [],
      habits: parsed.habits ?? {},
      lifts: parsed.lifts ?? {},
    }
  } catch {
    return EMPTY
  }
}

function save(store: Store) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(store))
  } catch {
    /* private browsing or blocked storage — the page still works, it just won't remember */
  }
}

const today = () => new Date().toISOString().slice(0, 10)

export default function FitnessTracker({ locale }: { locale: string }) {
  const ar = locale === 'ar'
  const [store, setStore] = useState<Store>(EMPTY)
  const [hydrated, setHydrated] = useState(false)
  const [openPhase, setOpenPhase] = useState<string>('p1')
  const [weightInput, setWeightInput] = useState('')

  useEffect(() => {
    setStore(load())
    setHydrated(true)
  }, [])

  const update = (next: Store) => {
    setStore(next)
    save(next)
  }

  const date = today()
  const doneToday = store.habits[date] ?? []

  const toggleHabit = (id: string) => {
    const next = doneToday.includes(id)
      ? doneToday.filter((h) => h !== id)
      : [...doneToday, id]
    update({ ...store, habits: { ...store.habits, [date]: next } })
  }

  const addWeight = (e: React.FormEvent) => {
    e.preventDefault()
    const kg = parseFloat(weightInput)
    if (!Number.isFinite(kg) || kg < 50 || kg > 250) return
    const weights = [...store.weights.filter((w) => w.date !== date), { date, kg }].sort(
      (a, b) => a.date.localeCompare(b.date),
    )
    update({ ...store, weights })
    setWeightInput('')
  }

  const setLift = (key: string, value: string) =>
    update({ ...store, lifts: { ...store.lifts, [key]: value } })

  const latest = store.weights.length ? store.weights[store.weights.length - 1].kg : START_WEIGHT
  const lost = Math.max(0, START_WEIGHT - latest)
  const toGoal = Math.max(0, latest - GOAL_WEIGHT)
  const progressPct = Math.min(100, (lost / (START_WEIGHT - GOAL_WEIGHT)) * 100)

  const t = (en: string, arText: string) => (ar ? arText : en)

  return (
    <div className="space-y-16">
      {/* ---- Progress summary ---- */}
      <section aria-labelledby="progress-heading" className="space-y-6">
        <h2 id="progress-heading" className="text-2xl font-bold text-brand-deep">
          {t('Where you are', 'أين أنت الآن')}
        </h2>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Stat label={t('Start', 'البداية')} value={`${START_WEIGHT}`} unit="kg" note="11 Sep 2026" />
          <Stat
            label={t('Now', 'الآن')}
            value={hydrated ? latest.toFixed(1) : '—'}
            unit="kg"
            note={t(`${lost.toFixed(1)} kg down`, `نزلت ${lost.toFixed(1)} كغ`)}
            accent
          />
          <Stat
            label={t('Week 12 target', 'هدف الأسبوع ١٢')}
            value={`${WEEK12_TARGET}`}
            unit="kg"
            note={t('Realistic landing', 'الهدف الواقعي')}
          />
          <Stat
            label={t('Goal', 'الهدف النهائي')}
            value={`${GOAL_WEIGHT}`}
            unit="kg"
            note={t(`${toGoal.toFixed(1)} kg to go`, `باقي ${toGoal.toFixed(1)} كغ`)}
          />
        </div>

        <div>
          <div className="flex justify-between text-sm text-brand-ink/70 mb-2">
            <span>{START_WEIGHT} kg</span>
            <span>{GOAL_WEIGHT} kg</span>
          </div>
          <div className="h-3 w-full rounded-full bg-brand-lilac/20 overflow-hidden">
            <div
              className="h-full rounded-full gradient-brand transition-all duration-500"
              style={{ width: `${hydrated ? progressPct : 0}%` }}
              role="progressbar"
              aria-valuenow={Math.round(progressPct)}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={t('Weight loss progress', 'تقدم إنقاص الوزن')}
            />
          </div>
        </div>

        <WeightChart weights={store.weights} ar={ar} />

        <form onSubmit={addWeight} className="flex flex-wrap items-end gap-3">
          <div className="flex-1 min-w-[12rem]">
            <label htmlFor="weight-input" className="block text-sm font-medium text-brand-deep mb-1">
              {t("Today's weight (morning, after the bathroom)", 'وزن اليوم (صباحاً بعد الحمام)')}
            </label>
            <input
              id="weight-input"
              type="number"
              step="0.1"
              min="50"
              max="250"
              inputMode="decimal"
              value={weightInput}
              onChange={(e) => setWeightInput(e.target.value)}
              placeholder="119.4"
              className="w-full rounded-lg border border-brand-lilac/40 bg-white px-4 py-2.5 text-brand-ink tabular-nums focus:border-brand-teal focus:outline-none focus:ring-2 focus:ring-brand-teal/40"
            />
          </div>
          <button
            type="submit"
            className="rounded-lg bg-brand-deep px-6 py-2.5 font-medium text-white hover:bg-brand-indigo focus:outline-none focus:ring-2 focus:ring-brand-teal"
          >
            {t('Log weight', 'سجّل الوزن')}
          </button>
        </form>
        <p className="text-sm text-brand-ink/60">
          {t(
            'Daily swings of 1–2 kg are water, not fat. Only the weekly average tells you anything.',
            'تذبذب ١–٢ كغ يومياً هو ماء وليس دهون. المتوسط الأسبوعي وحده هو المؤشر الحقيقي.',
          )}
        </p>
      </section>

      {/* ---- Daily checklist ---- */}
      <section aria-labelledby="habits-heading" className="space-y-5">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 id="habits-heading" className="text-2xl font-bold text-brand-deep">
            {t('Today’s non-negotiables', 'أساسيات اليوم')}
          </h2>
          <span className="text-sm font-medium tabular-nums text-brand-ink/70">
            {hydrated ? doneToday.length : 0} / {DAILY_HABITS.length}
          </span>
        </div>
        <ul className="grid gap-2 sm:grid-cols-2">
          {DAILY_HABITS.map((h) => {
            const done = doneToday.includes(h.id)
            return (
              <li key={h.id}>
                <label
                  className={`flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 transition ${
                    done
                      ? 'border-brand-teal bg-brand-teal/10'
                      : 'border-brand-lilac/30 bg-white hover:border-brand-lilac'
                  }`}
                >
                  <input
                    id={`habit-${h.id}`}
                    type="checkbox"
                    checked={done}
                    onChange={() => toggleHabit(h.id)}
                    className="h-5 w-5 shrink-0 accent-brand-teal"
                  />
                  <span className={`text-sm ${done ? 'text-brand-deep' : 'text-brand-ink'}`}>
                    {ar ? h.ar : h.en}
                  </span>
                </label>
              </li>
            )
          })}
        </ul>
      </section>

      {/* ---- Macros ---- */}
      <section aria-labelledby="macros-heading" className="space-y-5">
        <h2 id="macros-heading" className="text-2xl font-bold text-brand-deep">
          {t('Daily targets', 'الأهداف اليومية')}
        </h2>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
          {MACROS.map((m) => (
            <div key={m.key} className="rounded-lg bg-white px-4 py-4 border border-brand-lilac/30">
              <div className="text-xs uppercase tracking-wide text-brand-ink/60 mb-1">
                {ar ? m.ar : m.en}
              </div>
              <div className="text-2xl font-bold tabular-nums text-brand-deep">{m.value}</div>
              <div className="text-xs text-brand-ink/60">{ar ? m.unitAr : m.unit}</div>
            </div>
          ))}
        </div>
        <p className="text-sm text-brand-ink/70 max-w-2xl">
          {t(
            'Maintenance is roughly 2,750–2,850 kcal for you — the InBody’s 3,056 is optimistic. A 700 kcal deficit is about 0.8–1.0 kg per week.',
            'سعرات الثبات لديك تقريباً ٢٧٥٠–٢٨٥٠ سعرة — رقم الجهاز ٣٠٥٦ متفائل. عجز ٧٠٠ سعرة يعني نزول ٠٫٨–١ كغ أسبوعياً.',
          )}
        </p>
      </section>

      {/* ---- Meals ---- */}
      <section aria-labelledby="meals-heading" className="space-y-5">
        <h2 id="meals-heading" className="text-2xl font-bold text-brand-deep">
          {t('The plate', 'الصحن')}
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {MEALS.map((meal) => (
            <div key={meal.id} className="rounded-lg bg-white p-5 border border-brand-lilac/30">
              <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
                <h3 className="text-lg font-bold text-brand-deep">{ar ? meal.ar : meal.en}</h3>
                <span className="text-sm tabular-nums text-brand-ink/60">
                  {ar ? meal.kcalAr : meal.kcal}
                </span>
              </div>
              <ul className="space-y-2">
                {meal.items.map((item) => (
                  <li key={item.en} className="flex gap-2 text-sm text-brand-ink">
                    <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-teal" />
                    <span>{ar ? item.ar : item.en}</span>
                  </li>
                ))}
              </ul>
              {meal.swap && (
                <p className="mt-4 border-t border-brand-lilac/20 pt-3 text-sm text-brand-ink/70">
                  {ar ? meal.swap.ar : meal.swap.en}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ---- Training ---- */}
      <section aria-labelledby="training-heading" className="space-y-5">
        <h2 id="training-heading" className="text-2xl font-bold text-brand-deep">
          {t('The program', 'البرنامج')}
        </h2>
        <p className="text-sm text-brand-ink/70 max-w-2xl">
          {t(
            'Four lifting days: Sat, Mon, Wed, Thu. Sun and Tue are 45 min walks. Fri is fully off. Write the weight you used next to each exercise — that log is how you know you are progressing.',
            'أربعة أيام حديد: السبت، الاثنين، الأربعاء، الخميس. الأحد والثلاثاء مشي ٤٥ دقيقة. الجمعة راحة كاملة. سجّل الوزن الذي استخدمته بجانب كل تمرين — هذا السجل هو دليل تقدمك.',
          )}
        </p>
        <div className="space-y-3">
          {PHASES.map((phase) => (
            <PhaseBlock
              key={phase.id}
              phase={phase}
              ar={ar}
              open={openPhase === phase.id}
              onToggle={() => setOpenPhase(openPhase === phase.id ? '' : phase.id)}
              lifts={store.lifts}
              setLift={setLift}
            />
          ))}
        </div>
        <div className="rounded-lg border border-brand-lilac/40 bg-brand-lilac/10 p-5">
          <h3 className="font-bold text-brand-deep mb-2">
            {t('Not yet — and why', 'ليس بعد — والسبب')}
          </h3>
          <p className="text-sm text-brand-ink">
            {t(
              'No running, jumping, or sprint intervals until you are well under 110 kg. At 120 kg those load your knees and lower back far beyond what 14 months of detraining can absorb. Bike intervals give you the same conditioning without the impact.',
              'ممنوع الركض والقفز والجري المتقطع حتى تنزل تحت ١١٠ كغ بوضوح. عند ١٢٠ كغ تحمّل هذه الحركات ركبتيك وأسفل ظهرك أكثر بكثير مما يحتمله جسم متوقف عن التمرين ١٤ شهراً. الدراجة المتقطعة تعطيك نفس اللياقة بلا صدمات.',
            )}
          </p>
        </div>
      </section>

      {/* ---- Checkpoints ---- */}
      <section aria-labelledby="checkpoints-heading" className="space-y-5">
        <h2 id="checkpoints-heading" className="text-2xl font-bold text-brand-deep">
          {t('Re-test every 4 weeks', 'أعد الفحص كل ٤ أسابيع')}
        </h2>
        <div className="overflow-x-auto rounded-lg border border-brand-lilac/30 bg-white">
          <table className="w-full min-w-[32rem] text-sm">
            <thead>
              <tr className="border-b border-brand-lilac/30 text-left">
                <th scope="col" className="px-4 py-3 font-semibold text-brand-deep">
                  {t('Metric', 'القياس')}
                </th>
                <th scope="col" className="px-4 py-3 font-semibold text-brand-deep">
                  {t('11 Sep 2026', '١١ أيلول ٢٠٢٦')}
                </th>
                <th scope="col" className="px-4 py-3 font-semibold text-brand-deep">
                  {t('Week 12 target', 'هدف الأسبوع ١٢')}
                </th>
              </tr>
            </thead>
            <tbody>
              {CHECKPOINTS.map((c) => (
                <tr key={c.en} className="border-b border-brand-lilac/20 last:border-0">
                  <td className="px-4 py-3 text-brand-ink">{ar ? c.ar : c.en}</td>
                  <td className="px-4 py-3 tabular-nums text-brand-ink/70">{c.start}</td>
                  <td className="px-4 py-3 tabular-nums font-medium text-brand-deep">{c.target}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="rounded-lg border-l-4 border-brand-teal bg-white p-5">
          <p className="text-sm text-brand-ink">
            <strong className="text-brand-deep">
              {t('Skeletal muscle is the number that matters.', 'العضلات الهيكلية هي الرقم الأهم.')}
            </strong>{' '}
            {t(
              'If SMM drops more than about 1 kg, you are cutting too hard or missing your protein. Raise calories by 200 and check your protein before you cut anything further.',
              'إذا نزلت العضلات أكثر من كيلو تقريباً، فالعجز كبير جداً أو البروتين ناقص. ارفع السعرات ٢٠٠ وتأكد من البروتين قبل أي تخفيض إضافي.',
            )}
          </p>
        </div>
      </section>

      {/* ---- Medical ---- */}
      <section aria-labelledby="medical-heading">
        <h2 id="medical-heading" className="text-2xl font-bold text-brand-deep mb-4">
          {t('Book this in the first two weeks', 'احجز هذا خلال أول أسبوعين')}
        </h2>
        <div className="rounded-lg bg-white p-5 border border-brand-lilac/30">
          <p className="text-sm text-brand-ink mb-3">
            {t(
              'A waist of 125.2 cm and a visceral fat area of 185 cm² put you well past the threshold where a baseline workup is worth doing. Start the plan now — do not wait for the results.',
              'محيط خصر ١٢٥٫٢ سم ومساحة دهون حشوية ١٨٥ سم² تتجاوز الحد الذي يستدعي فحوصات أساسية. ابدأ البرنامج الآن — لا تنتظر النتائج.',
            )}
          </p>
          <ul className="grid gap-2 sm:grid-cols-2">
            {[
              { en: 'Fasting glucose + HbA1c', ar: 'سكر صائم + تراكمي' },
              { en: 'Full lipid panel', ar: 'صورة دهنيات كاملة' },
              { en: 'Liver enzymes (ALT/AST)', ar: 'إنزيمات الكبد' },
              { en: 'Thyroid (TSH)', ar: 'الغدة الدرقية' },
              { en: 'Blood pressure', ar: 'ضغط الدم' },
              { en: 'Sleep apnea screen — mention snoring and daytime sleepiness', ar: 'فحص انقطاع النفس النومي — اذكر الشخير والنعاس النهاري' },
            ].map((item) => (
              <li key={item.en} className="flex gap-2 text-sm text-brand-ink">
                <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-teal" />
                <span>{ar ? item.ar : item.en}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <p className="text-xs text-brand-ink/50 border-t border-brand-lilac/30 pt-6">
        {t(
          'Everything you log stays in this browser only — nothing is sent anywhere. This is a personal training plan, not medical advice; clear it with your doctor if you have any diagnosed condition.',
          'كل ما تسجله يبقى في هذا المتصفح فقط — لا يُرسل إلى أي مكان. هذه خطة تدريب شخصية وليست استشارة طبية؛ راجع طبيبك إن كان لديك أي حالة مشخّصة.',
        )}
      </p>
    </div>
  )
}

function Stat({
  label,
  value,
  unit,
  note,
  accent = false,
}: {
  label: string
  value: string
  unit: string
  note: string
  accent?: boolean
}) {
  return (
    <div
      className={`rounded-lg px-5 py-4 ${
        accent ? 'gradient-brand text-white' : 'bg-white border border-brand-lilac/30'
      }`}
    >
      <div
        className={`text-xs uppercase tracking-wide mb-1 ${
          accent ? 'text-white/70' : 'text-brand-ink/60'
        }`}
      >
        {label}
      </div>
      <div className="flex items-baseline gap-1">
        <span
          className={`text-3xl font-bold tabular-nums ${accent ? 'text-white' : 'text-brand-deep'}`}
        >
          {value}
        </span>
        <span className={`text-sm ${accent ? 'text-white/70' : 'text-brand-ink/60'}`}>{unit}</span>
      </div>
      <div className={`text-xs mt-1 ${accent ? 'text-white/70' : 'text-brand-ink/60'}`}>{note}</div>
    </div>
  )
}

function PhaseBlock({
  phase,
  ar,
  open,
  onToggle,
  lifts,
  setLift,
}: {
  phase: Phase
  ar: boolean
  open: boolean
  onToggle: () => void
  lifts: Record<string, string>
  setLift: (key: string, value: string) => void
}) {
  return (
    <div className="overflow-hidden rounded-lg border border-brand-lilac/30 bg-white">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-start hover:bg-brand-bg focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand-teal"
      >
        <span>
          <span className="block text-xs font-semibold uppercase tracking-wide text-brand-teal">
            {ar ? phase.weeksAr : phase.weeks}
          </span>
          <span className="block text-lg font-bold text-brand-deep">
            {ar ? phase.nameAr : phase.name}
          </span>
        </span>
        <span
          aria-hidden="true"
          className={`shrink-0 text-brand-indigo transition-transform ${open ? 'rotate-180' : ''}`}
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>

      {open && (
        <div className="border-t border-brand-lilac/30 px-5 py-5 space-y-5">
          <p className="text-sm text-brand-ink max-w-2xl">{ar ? phase.intentAr : phase.intent}</p>
          <div className="flex flex-wrap gap-2">
            <Tag>{ar ? phase.effortAr : phase.effort}</Tag>
            <Tag>{ar ? phase.cardioAr : phase.cardio}</Tag>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {phase.sessions.map((session) => (
              <div key={session.id} className="rounded-lg bg-brand-bg p-4">
                <div className="mb-3 flex items-baseline justify-between gap-2">
                  <h4 className="font-bold text-brand-deep">{ar ? session.titleAr : session.title}</h4>
                  <span className="text-xs font-medium uppercase tracking-wide text-brand-indigo">
                    {ar ? session.dayAr : session.day}
                  </span>
                </div>
                <ul className="space-y-2">
                  {session.exercises.map((ex, i) => {
                    const key = `${session.id}:${i}`
                    return (
                      <li key={key} className="flex flex-wrap items-center gap-2">
                        <span className="flex-1 min-w-[9rem] text-sm text-brand-ink">
                          {ar ? ex.nameAr : ex.name}
                        </span>
                        <span className="text-xs tabular-nums text-brand-ink/60">{ex.sets}</span>
                        <input
                          id={`lift-${key}`}
                          type="text"
                          value={lifts[key] ?? ''}
                          onChange={(e) => setLift(key, e.target.value)}
                          placeholder={ar ? 'كغ' : 'kg'}
                          aria-label={`${ar ? ex.nameAr : ex.name} — ${ar ? 'الوزن المستخدم' : 'weight used'}`}
                          className="w-16 rounded border border-brand-lilac/40 bg-white px-2 py-1 text-xs tabular-nums text-brand-ink focus:border-brand-teal focus:outline-none focus:ring-1 focus:ring-brand-teal"
                        />
                      </li>
                    )
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full bg-brand-lilac/15 px-3 py-1 text-xs font-medium text-brand-indigo">
      {children}
    </span>
  )
}

// Chart geometry lives at module scope so the memo below has a stable
// dependency list.
const W = 720
const H = 220
const PAD = { top: 16, right: 16, bottom: 28, left: 44 }

function WeightChart({ weights, ar }: { weights: { date: string; kg: number }[]; ar: boolean }) {
  const points = useMemo(() => {
    if (weights.length === 0) return []
    const max = START_WEIGHT + 2
    const min = GOAL_WEIGHT - 2
    const plotW = W - PAD.left - PAD.right
    const plotH = H - PAD.top - PAD.bottom
    const n = Math.max(weights.length - 1, 1)
    return weights.map((w, i) => ({
      ...w,
      x: PAD.left + (plotW * i) / n,
      y: PAD.top + plotH * ((max - w.kg) / (max - min)),
    }))
  }, [weights])

  const yFor = (kg: number) => {
    const max = START_WEIGHT + 2
    const min = GOAL_WEIGHT - 2
    return PAD.top + (H - PAD.top - PAD.bottom) * ((max - kg) / (max - min))
  }

  const ticks = [120, 112, 104, 96]

  if (weights.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-brand-lilac/50 bg-white px-5 py-8 text-center">
        <p className="text-sm text-brand-ink/60">
          {ar
            ? 'سجّل وزنك أول مرة ليبدأ الرسم البياني.'
            : 'Log your first weigh-in and the chart starts here.'}
        </p>
      </div>
    )
  }

  const path = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ')
  const last = points[points.length - 1]

  return (
    <div className="overflow-x-auto rounded-lg border border-brand-lilac/30 bg-white p-4">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full min-w-[30rem]"
        role="img"
        aria-label={
          ar
            ? `مخطط الوزن: ${weights.length} قياس، آخر وزن ${last.kg} كيلوغرام`
            : `Weight chart: ${weights.length} weigh-ins, latest ${last.kg} kg`
        }
      >
        {ticks.map((kg) => (
          <g key={kg}>
            <line
              x1={PAD.left}
              x2={W - PAD.right}
              y1={yFor(kg)}
              y2={yFor(kg)}
              stroke={kg === GOAL_WEIGHT ? '#2FD4C4' : '#8B7FE8'}
              strokeOpacity={kg === GOAL_WEIGHT ? 0.9 : 0.25}
              strokeDasharray={kg === GOAL_WEIGHT ? '6 4' : undefined}
              strokeWidth="1"
            />
            <text
              x={PAD.left - 8}
              y={yFor(kg) + 4}
              textAnchor="end"
              fill="#1A1730"
              fillOpacity="0.55"
              fontSize="11"
            >
              {kg}
            </text>
          </g>
        ))}

        <path d={path} fill="none" stroke="#4B3F9E" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
        {points.map((p) => (
          <circle key={p.date} cx={p.x} cy={p.y} r="3" fill="#4B3F9E" />
        ))}
        <circle cx={last.x} cy={last.y} r="5.5" fill="#2FD4C4" stroke="#2E2560" strokeWidth="2" />

        <text
          x={PAD.left}
          y={H - 8}
          fill="#1A1730"
          fillOpacity="0.55"
          fontSize="11"
        >
          {points[0].date}
        </text>
        {weights.length > 1 && (
          <text x={W - PAD.right} y={H - 8} textAnchor="end" fill="#1A1730" fillOpacity="0.55" fontSize="11">
            {last.date}
          </text>
        )}
      </svg>
    </div>
  )
}
