"use client"

import React, { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import axios from "axios"
import tzdata from "tzdata"
import { DateTime } from "luxon"
import DiscordIcon from "@/components/discord-icon"
import background from "@/images/background.jpg"

const { zones } = tzdata
const DISCORD_URL = "https://discord.gg/TefAuR4m5c"

// Field name -> follow-up question. Keys match the existing /api/apply payload.
const referralQuestions = {
  "In Game": "What were you doing?",
  "Search Engine": "Which search engine?",
  "Friend or Referral": "Which in-game character?",
  "Recruitment Post": "Where was it posted?",
  "Other": "Briefly, explain...",
}
const referralOptions = Object.keys(referralQuestions)

const AlertIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 9v4" /><path d="M12 17h.01" /><path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" />
  </svg>
)
const CheckIcon = ({ size = 32, stroke = 2.6 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20 6 9 17l-5-5" />
  </svg>
)

const Field = ({ label, name, error, children }) => (
  <div className="lr-field">
    <label className="lr-label" htmlFor={name}>{label} <span className="req">*</span></label>
    {React.cloneElement(children, {
      "aria-invalid": error ? true : undefined,
      "aria-describedby": error ? `${name}-error` : undefined,
    })}
    {error && <div className="lr-error" id={`${name}-error`}>{error}</div>}
  </div>
)

const ApplyForm = ({ mdx }) => {
  const [form, setForm] = useState({})
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState(null)
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  // Same timezone option format the antd form produced, so the webhook
  // message reads identically.
  const timezoneOptions = useMemo(() => {
    const dto = DateTime.local()
    return Object.entries(zones)
      .filter(([tz, v]) => Array.isArray(v) && DateTime.local().setZone(tz).isValid)
      .map(([tz]) => {
        const dt = dto.setZone(tz)
        const value = `[UTC${dt.toFormat("Z")}] ${dt.zoneName.replace(/_/g, " ")}${dt.isInDST ? " (DST)" : ""}`
        return { value, label: dt.zoneName.replace(/_/g, " ") }
      })
      .sort((a, b) => a.label.localeCompare(b.label))
  }, [])

  const setField = (name, value) => {
    setForm((f) => ({ ...f, [name]: value }))
    setErrors((e) => ({ ...e, [name]: "" }))
  }
  const onChange = (e) => setField(e.target.name, e.target.value)

  const pickReferral = (value) => {
    setForm((f) => ({ ...f, ReferredFrom: value }))
    setErrors((e) => ({ ...e, ReferredFrom: "" }))
  }

  const validate = () => {
    const f = form
    const next = {}
    if (!f.PreferredName) next.PreferredName = "This field is required."
    if (!f.PreferredPronouns) next.PreferredPronouns = "This field is required."
    if (!f.Gw2AccountId) next.Gw2AccountId = "This field is required."
    else if (!/\w+\.\d{4}/.test(f.Gw2AccountId)) next.Gw2AccountId = "Required format: AccountName.1234"
    if (!f.DiscordId) next.DiscordId = "This field is required."
    if (!f.AboutMe) next.AboutMe = "This field is required."
    if (!f.LookingFor) next.LookingFor = "This field is required."
    if (!f.Timezone) next.Timezone = "This field is required."
    if (!f.ReferredFrom) next.ReferredFrom = "Please pick one."
    else if (!f.ReferralDetail) next.ReferralDetail = "This field is required."
    return next
  }

  const onSubmit = async () => {
    const next = validate()
    if (Object.keys(next).length) { setErrors(next); return }
    setSubmitting(true)
    setSubmitError(null)
    const payload = {
      PreferredName: form.PreferredName,
      PreferredPronouns: form.PreferredPronouns,
      Gw2AccountId: form.Gw2AccountId,
      DiscordId: form.DiscordId,
      AboutMe: form.AboutMe,
      LookingFor: form.LookingFor,
      Timezone: form.Timezone,
      ReferredFrom: form.ReferredFrom,
      ReferralDetail: form.ReferralDetail,
    }
    try {
      await axios.post("/api/apply", payload)
      setSubmitted(true)
    } catch (err) {
      setSubmitError("Something went wrong, please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  const referralQuestion = form.ReferredFrom ? referralQuestions[form.ReferredFrom] : null

  return (
    <>
      {/* Hero */}
      <section className="lr-apply-hero">
        <div className="lr-hero-bg">
          <Image src={background} alt="" fill priority placeholder="blur" sizes="100vw" style={{ objectFit: "cover" }} />
        </div>
        <div className="lr-apply-hero-fade" />
        <div className="lr-apply-hero-inner">
          <span className="lr-badge"><AlertIcon /> Read this first</span>
          <h1 className="lr-apply-title">Before you apply</h1>
          <p className="lr-apply-lead">
            We recruit for character, not hours played. A few things worth knowing before you reach out — then fill out the form below and we&apos;ll be in touch on Discord.
          </p>
          <div className="lr-apply-cta">
            <a href="#apply-form" className="lr-btn lr-btn-lg lr-btn-primary">Jump to the form ↓</a>
            <Link href="/#community" className="lr-btn lr-btn-lg lr-btn-ghost">About the guild</Link>
          </div>
        </div>
      </section>

      {/* About — sourced from content/apply.mdx */}
      <section className="lr-apply-about">
        <div className="lr-prose">{mdx}</div>
      </section>

      {/* Application form */}
      <section id="apply-form" className="lr-form-section">
        <div className="lr-form-head">
          <span className="lr-eyebrow">The application</span>
          <h2 className="lr-section-title">Join us</h2>
          <p>
            Tell us a little about yourself. Prefer chat? You can also type <strong>?apply</strong> in <span className="accent">#apply-here</span> on Discord.
          </p>
        </div>

        {submitted ? (
          <div className="lr-success">
            <div className="lr-success-check"><CheckIcon /></div>
            <h3>Application submitted</h3>
            <p className="lr-success-sub">Nice to meet you. There are just a couple steps left.</p>
            <div className="lr-success-steps">
              <div className="lr-success-step done">
                <span className="lr-success-badge filled"><CheckIcon size={16} stroke={3} /></span>
                <div>
                  <div className="lr-success-step-title">Application sent</div>
                  <div className="lr-success-step-desc">We&apos;ve got your details.</div>
                </div>
              </div>
              <div className="lr-success-step">
                <span className="lr-success-badge hollow">2</span>
                <div>
                  <div className="lr-success-step-title">Connect on Discord</div>
                  <div className="lr-success-step-desc">Join our <a href={DISCORD_URL} target="_blank" rel="noopener">Discord server</a> so we can reach you.</div>
                </div>
              </div>
              <div className="lr-success-step">
                <span className="lr-success-badge hollow">3</span>
                <div>
                  <div className="lr-success-step-title">Meet the guild</div>
                  <div className="lr-success-step-desc">Attend the next orientation — Sundays at 12:30 PM EDT.</div>
                </div>
              </div>
            </div>
            <a href={DISCORD_URL} target="_blank" rel="noopener" className="lr-btn lr-btn-lg lr-btn-primary">
              <DiscordIcon size={19} /> Open our Discord
            </a>
          </div>
        ) : (
          <div className="lr-form-card">
            <div className="lr-field-grid">
              <Field label="Preferred name" name="PreferredName" error={errors.PreferredName}>
                <input id="PreferredName" name="PreferredName" className="lr-input" maxLength={50} placeholder="What should others call you?" value={form.PreferredName || ""} onChange={onChange} />
              </Field>
              <Field label="Preferred pronouns" name="PreferredPronouns" error={errors.PreferredPronouns}>
                <input id="PreferredPronouns" name="PreferredPronouns" className="lr-input" maxLength={15} placeholder="He / She / They / Sie" value={form.PreferredPronouns || ""} onChange={onChange} />
              </Field>
              <Field label="GW2 account ID" name="Gw2AccountId" error={errors.Gw2AccountId}>
                <input id="Gw2AccountId" name="Gw2AccountId" className="lr-input" maxLength={50} placeholder="AccountName.1234" value={form.Gw2AccountId || ""} onChange={onChange} />
              </Field>
              <Field label="Discord username" name="DiscordId" error={errors.DiscordId}>
                <input id="DiscordId" name="DiscordId" className="lr-input" maxLength={50} placeholder="yourname" value={form.DiscordId || ""} onChange={onChange} />
              </Field>
            </div>

            <Field label="Tell us about yourself" name="AboutMe" error={errors.AboutMe}>
              <textarea id="AboutMe" name="AboutMe" className="lr-textarea" maxLength={470} rows={4} placeholder="Your gaming background and play style…" value={form.AboutMe || ""} onChange={onChange} />
            </Field>

            <Field label="What are you looking for in a guild?" name="LookingFor" error={errors.LookingFor}>
              <textarea id="LookingFor" name="LookingFor" className="lr-textarea" maxLength={470} rows={4} placeholder="What matters most to you in a community…" value={form.LookingFor || ""} onChange={onChange} />
            </Field>

            <Field label="Your timezone" name="Timezone" error={errors.Timezone}>
              <select id="Timezone" name="Timezone" className="lr-select" value={form.Timezone || ""} onChange={onChange}>
                <option value="">Select your timezone…</option>
                {mounted && timezoneOptions.map((tz) => <option key={tz.value} value={tz.value}>{tz.label}</option>)}
              </select>
            </Field>

            <div className="lr-field" role="group" aria-labelledby="referred-label" aria-describedby={errors.ReferredFrom ? "ReferredFrom-error" : undefined}>
              <span className="lr-label" id="referred-label">How did you hear about us? <span className="req">*</span></span>
              <div className="lr-chip-row">
                {referralOptions.map((opt) => (
                  <button type="button" key={opt} aria-pressed={form.ReferredFrom === opt} className={`lr-chip${form.ReferredFrom === opt ? " active" : ""}`} onClick={() => pickReferral(opt)}>
                    {opt}
                  </button>
                ))}
              </div>
              {errors.ReferredFrom && <div className="lr-error" id="ReferredFrom-error">{errors.ReferredFrom}</div>}
            </div>

            {referralQuestion && (
              <Field label={referralQuestion} name="ReferralDetail" error={errors.ReferralDetail}>
                <input id="ReferralDetail" name="ReferralDetail" className="lr-input" maxLength={50} placeholder="A quick detail…" value={form.ReferralDetail || ""} onChange={onChange} />
              </Field>
            )}

            <button type="button" className="lr-submit" onClick={onSubmit} disabled={submitting}>
              {submitting ? "Sending…" : "Submit application"}
            </button>
            {submitError && <div className="lr-error" style={{ textAlign: "center", marginTop: 12 }}>{submitError}</div>}
            <p className="lr-form-fineprint">By applying you agree to our zero-tolerance stance on toxicity and discrimination.</p>
          </div>
        )}
      </section>
    </>
  )
}

export default ApplyForm
