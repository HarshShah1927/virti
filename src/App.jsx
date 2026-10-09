import { useMemo, useState } from 'react';
import couplePhoto from './assets/couple-photo.jpg';

const locations = [
  ['☕', 'Coffee'], ['🍝', 'Dinner'], ['🎬', 'Movie'], ['🌆', 'Long drive'], ['💕', 'Surprise me'], ['✍️', 'Your choice'],
];

const messages = ['Nice try 😌', 'Are you sure about that? 👀', 'I admire your commitment 😄'];
function formatDate(value) {
  return new Date(`${value}T12:00:00`).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
}
function formatTime(value) {
  const [hours, minutes] = value.split(':').map(Number);
  return new Date(2000, 0, 1, hours, minutes).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
}

export default function App() {
  const [stage, setStage] = useState(0);
  const [noCount, setNoCount] = useState(0);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [place, setPlace] = useState('');
  const [customPlace, setCustomPlace] = useState('');
  const today = useMemo(() => new Date().toLocaleDateString('en-CA'), []);
  const chosenPlace = place === 'Your choice' ? customPlace.trim() : place;
  const validDate = date && date >= today;
  const canConfirm = validDate && time && chosenPlace;

  function dodgeNo() { setNoCount((count) => count + 1); }

  return <main className="scene">
    <div aria-hidden="true" className="float-heart heart-one">♡</div>
    <div aria-hidden="true" className="float-heart heart-two">♥</div>
    <div aria-hidden="true" className="float-heart heart-three">♡</div>
    <div className={`card stage-${stage}`} key={stage}>
      {stage === 0 && <section className="intro fade-up">
        <span className="eyebrow">Hey Virti… 👀</span>
        <h1>I made something tiny just for you… <span>❤️</span></h1>
        <div className="photo-frame"><img src={couplePhoto} alt="Virti and me together" /></div>
        <button className="button primary" onClick={() => setStage(1)}>Okay, show me <span aria-hidden="true">→</span></button>
      </section>}

      {stage === 1 && <section className="question fade-up">
        <span className="eyebrow">So… I have an important question for you. 🥺</span>
        <h1>Virti, will you go on a date with me? <span>❤️</span></h1>
        <div className="answers">
          <button className="button primary yes" onClick={() => setStage(2)}>YES <span>❤️</span></button>
          <button className="button secondary no" style={{ transform: noCount ? `translate(${[0, 9, -9, 5][noCount % 4]}px, ${[0, -3, 3, -2][noCount % 4]}px)` : undefined }} onClick={dodgeNo} onPointerEnter={(event) => { if (event.pointerType === 'mouse') dodgeNo(); }} aria-label="No (just kidding)">NO <span>🙃</span></button>
        </div>
        <p className="playful" aria-live="polite">{noCount ? messages[Math.min(noCount - 1, messages.length - 1)] : ' '} </p>
        <p className="gentle-note">(You can still say no. I’ll survive. Probably.)</p>
      </section>}

      {stage === 2 && <section className="planner fade-up">
        <div className="celebration" aria-hidden="true">✦　♥　✦</div>
        <span className="eyebrow">YAYYYYY ❤️</span>
        <h1>It’s a date! 🫶🏻</h1>
        <div className="fields">
          <label className="field"><span>📅 Pick a date</span><input type="date" min={today} value={date} onChange={(e) => setDate(e.target.value)} /></label>
          <label className="field"><span>⏰ Pick a time</span><input type="time" value={time} onChange={(e) => setTime(e.target.value)} /></label>
        </div>
        <fieldset className="location-field"><legend>📍 Where should we go?</legend><div className="choices">
          {locations.map(([icon, name]) => <button type="button" key={name} className={`choice ${place === name ? 'selected' : ''}`} aria-pressed={place === name} onClick={() => setPlace(name)}><span>{icon}</span>{name}</button>)}
        </div></fieldset>
        {place === 'Your choice' && <label className="field custom"><span>Your choice</span><input type="text" value={customPlace} onChange={(e) => setCustomPlace(e.target.value)} placeholder="Tell me what you have in mind" maxLength={80} /></label>}
        <button className="button primary confirm" disabled={!canConfirm} onClick={() => setStage(3)}>Confirm our date ❤️</button>
      </section>}

      {stage === 3 && <section className="confirmation fade-up">
        <div className="celebration" aria-hidden="true">✦　♥　✦</div>
        <span className="eyebrow">IT’S OFFICIAL. ❤️</span>
        <h1>Our little plan</h1>
        <div className="details"><p><span>📅</span>{formatDate(date)}</p><p><span>⏰</span>{formatTime(time)}</p><p><span>📍</span>{chosenPlace}</p></div>
        <h2>You + Me = Date. 🫶🏻</h2>
        <p className="love-note">I’ll see you there, pretty girl. ❤️</p>
        <div className="cant-wait">Can’t wait 🥹 <span aria-hidden="true">♥</span></div>
      </section>}
    </div>
    <p className="privacy">Just between us · Nothing is sent anywhere</p>
  </main>;
}
