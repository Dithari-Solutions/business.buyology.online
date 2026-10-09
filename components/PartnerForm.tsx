"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { initialApplication, investments, partnerships, questions, steps, type Application } from "@/lib/qualification";
const descriptions = ["Let’s get to know you and your business.", "Tell us about your current operation. Every Yes or No answer helps us understand your profile.", "Share your capacity to invest in and maintain local inventory.", "Tell us how you could grow Buyology in your market.", "The most important part: choose the partnership you want to build with us."];
const fields = [
 { key: "name", label: "Name", type: "text", autocomplete: "name", max: 200 },
 { key: "company", label: "Company", type: "text", autocomplete: "organization", max: 200 },
 { key: "cityCountry", label: "City / Country", type: "text", autocomplete: "off", max: 200 },
 { key: "phone", label: "Mobile / WhatsApp", type: "tel", autocomplete: "tel", max: 50 },
 { key: "email", label: "Email address", type: "email", autocomplete: "email", max: 255 },
 { key: "website", label: "Website / Social Media", type: "text", autocomplete: "url", max: 500 },
] as const;
export default function PartnerForm() {
 const [step, setStep] = useState(0);
 const [data, setData] = useState<Application>(initialApplication);
 const [error, setError] = useState("");
 const [sending, setSending] = useState(false);
 const [receipt, setReceipt] = useState("");
 const [requestId, setRequestId] = useState("");
 const [trap, setTrap] = useState("");
 const form = useRef<HTMLFormElement>(null);
 const title = useRef<HTMLHeadingElement>(null);
 useEffect(() => {
   setRequestId(crypto.randomUUID());
   const interest = new URLSearchParams(window.location.search).get("interest");
   if (partnerships.some(p => p.value === interest)) setData(d => ({ ...d, partnerships: [interest!] }));
 }, []);
 const go = (next: number) => { setError(""); setStep(next); requestAnimationFrame(() => { title.current?.focus(); title.current?.scrollIntoView({ behavior: "smooth", block: "start" }); }); };
 const validStep = (index: number) => {
   if (index === 0) return fields.filter(f => f.key !== "website").every(f => data[f.key].trim()) && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim()) && /^[+()\d\s.\-]{5,50}$/.test(data.phone.trim()) && /\d/.test(data.phone);
   if (index === 2 && !investments.includes(data.investment)) return false;
   if (index === 4 && (data.partnerships.length !== 1 || !data.whyBuyology.trim() || data.whyBuyology.length > 2000)) return false;
   return questions.filter(q => q[2] === index).every(q => typeof data.answers[q[0]] === "boolean");
 };
 const submit = async (event: React.FormEvent) => {
   event.preventDefault();
   if (sending) return;
   if (!form.current?.reportValidity() || !validStep(step)) { setError(step === 4 ? "Choose one partnership, answer the final confirmation, and explain why you have chosen Buyology." : "Please complete every required question. Enter a valid email and mobile number."); return; }
   if (step < 4) { go(step + 1); return; }
   const missing = steps.findIndex((_, i) => !validStep(i));
   if (missing !== -1) { go(missing); setError("Please complete all required answers before submitting."); return; }
   setSending(true); setError("");
   try {
     const base = process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.buyology.online";
     const response = await fetch(`${base.replace(/\/$/, "")}/api/partnership/requests`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...data, name: data.name.trim(), company: data.company.trim(), cityCountry: data.cityCountry.trim(), email: data.email.trim(), phone: data.phone.trim(), website: data.website.trim(), whyBuyology: data.whyBuyology.trim(), requestId, websiteAddress: trap }), signal: AbortSignal.timeout(25000) });
     if (!response.ok) throw new Error(response.status === 429 ? "Too many attempts. Please wait a minute and try again." : response.status === 409 ? "This application reference has already been submitted with different answers. Please reload to start a new application." : "We couldn’t submit your application. Your answers are still here; please try again.");
     const result = await response.json();
     if (!result.data?.id) throw new Error("We couldn’t confirm your submission. Please try again.");
     setReceipt(result.data.id);
   } catch (e) { setError(e instanceof Error && e.name !== "TimeoutError" && e.name !== "TypeError" ? e.message : "We couldn’t reach Buyology. Your answers are still here. Please try again."); }
   finally { setSending(false); }
 };
 if (receipt) return <section className="container success"><p className="eyebrow">APPLICATION RECEIVED</p><div className="success-mark" aria-hidden="true">✓</div><h1>Thank you, {data.name.split(" ")[0]}.</h1><p>Your partnership request for <strong>{data.company}</strong> has been saved. We’ve queued a confirmation email to <strong>{data.email}</strong>.</p><p>If your profile meets our requirements, the Buyology team will contact you for a detailed discussion.</p><p className="reference">Request reference: {receipt}</p><Link className="button" href="/">Back to home</Link></section>;
 return <section className="application-section"><div className="container application-heading"><p className="eyebrow">BECOME A BUYOLOGY PARTNER</p><h1>A few answers.<br /><span>A new possibility.</span></h1><p>Complete our quick qualification form.</p></div><div className="container application-layout">
 <aside className="step-sidebar"><p className="eyebrow">YOUR APPLICATION</p><ol>{steps.map((s,i)=><li className={step === i ? "active" : i < step ? "complete" : ""} key={s}><button type="button" disabled={i > step || sending} onClick={()=>go(i)} aria-current={i===step ? "step" : undefined}><span>{i < step ? "✓" : `0${i+1}`}</span><div>{s}{i===4 && <small>Choose your future</small>}</div></button></li>)}</ol><div className="sidebar-note"><strong>Built around your business.</strong><p>Your profile helps us find the right fit. Submitting this form starts a conversation; it is not a partnership commitment.</p></div></aside>
 <form ref={form} onSubmit={submit} className="form-panel"><div className="form-progress"><span>Step {step+1} of 5</span><span>{Math.round(((step+1)/5)*100)}%</span></div><progress max="5" value={step+1} aria-label="Application progress" /><h2 ref={title} tabIndex={-1}>{steps[step]}</h2><p className="form-description">{descriptions[step]}</p>
 <div className="honeypot" aria-hidden="true"><label>Leave this empty<input tabIndex={-1} autoComplete="off" value={trap} onChange={e=>setTrap(e.target.value)} /></label></div>
 {step===0 && <div className="input-grid">{fields.map(f=><label className="input-label" key={f.key}>{f.label} {f.key==="website" ? <span>(optional)</span> : <span aria-hidden="true">*</span>}<input required={f.key!=="website"} name={f.key} type={f.type} autoComplete={f.autocomplete} maxLength={f.max} value={data[f.key]} onChange={e=>setData({...data,[f.key]:e.target.value})} />{f.key==="email" && <small>We’ll send your application confirmation here.</small>}</label>)}</div>}
 {step===2 && <fieldset className="investment-field"><legend>Initial inventory investment <span aria-hidden="true">*</span></legend><p>Buyology is looking for Stockist Partners capable of investing approximately USD 50,000–100,000 in initial inventory.</p><div className="investment-options">{investments.map(v=><label className={data.investment===v ? "option selected" : "option"} key={v}><input type="radio" name="investment" value={v} required checked={data.investment===v} onChange={()=>setData({...data,investment:v})} /><span>{v}</span></label>)}</div></fieldset>}
 {step===4 && <><fieldset className="partnership-field"><legend>Your preferred partnership <span aria-hidden="true">*</span></legend><p>Choose the one partnership that best matches your ambitions.</p><div className="choice-grid">{partnerships.map(p=><label className={data.partnerships.includes(p.value) ? "choice selected" : "choice"} key={p.value}><div className="choice-top"><span>{p.number}</span><input type="radio" name="partnerships" required value={p.value} checked={data.partnerships.includes(p.value)} onChange={()=>setData({...data,partnerships:[p.value]})} /></div><strong>{p.title}</strong><p>{p.description}</p></label>)}</div></fieldset><h3 className="confirmation-title">Final confirmation</h3></>}
 <div className="question-list">{questions.filter(q=>q[2]===step).map(([key,label])=><fieldset className="yes-no" key={key}><legend>{label} <span aria-hidden="true">*</span></legend><div>{[true,false].map(value=><label className={data.answers[key]===value ? "answer selected" : "answer"} key={String(value)}><input type="radio" name={key} required checked={data.answers[key]===value} onChange={()=>setData({...data,answers:{...data.answers,[key]:value}})} />{value ? "Yes" : "No"}</label>)}</div></fieldset>)}</div>
 {step===4 && <label className="input-label reason-field" htmlFor="whyBuyology">Why have you chosen Buyology as your preferred business partner? <span aria-hidden="true">*</span><textarea id="whyBuyology" name="whyBuyology" rows={5} required maxLength={2000} value={data.whyBuyology} onChange={e=>setData({...data,whyBuyology:e.target.value})} /></label>}
 {step===4 && <details className="review"><summary>Review your application before submitting</summary><dl>{fields.map(f=><div key={f.key}><dt>{f.label}</dt><dd>{data[f.key] || "Not provided"}</dd></div>)}<div><dt>Investment</dt><dd>{data.investment}</dd></div><div><dt>Preferred partnership</dt><dd>{partnerships.filter(p=>data.partnerships.includes(p.value)).map(p=>p.title).join(", ") || "Choose above"}</dd></div>{questions.map(q=><div key={q[0]}><dt>{q[1]}</dt><dd>{data.answers[q[0]]===undefined ? "Not answered" : data.answers[q[0]] ? "Yes" : "No"}</dd></div>)}<div><dt>Why have you chosen Buyology as your preferred business partner?</dt><dd className="reason-answer">{data.whyBuyology || "Not answered"}</dd></div></dl></details>}
 {error && <p className="form-error" role="alert">{error}</p>}
 {step===4 && <p className="data-note">Buyology will use your answers to assess your request and contact you about a partnership. A confirmation will be sent to your email address.</p>}
 <div className="form-actions"><button className="button secondary" type="button" disabled={step===0 || sending} onClick={()=>go(step-1)}>Back</button><button className="button" type="submit" disabled={sending || !requestId}>{sending ? "Submitting…" : step===4 ? "Submit partnership request" : "Continue"}</button></div>
 </form></div></section>;
}
