# 🎅 Secret Santa AI Matchmaker - Idé-Dokumentation

**För:** Agentic Jul Hackathon 2025-12-18
**Team:** 5 personer
**Tid:** 2.5 timmar
**Status:** REKOMMENDERAD IDÉ (baserat på vinnare-analys)

---

## 🎯 VAD ÄR DET?

En webb-app som använder AI för att skapa perfekta Secret Santa-matchningar och föreslå personliga julklappar.

### Secret Santa - Snabb Förklaring

**Traditionellt Secret Santa:**
1. Grupp människor vill ge julklappar till varandra
2. Alla drar lott (papperslappar ur hatt)
3. Random person = vem du ska ge till
4. Hemligt vem som ger till vem
5. Budget bestäms (t.ex. 200-500 kr)

**Problem med random lottning:**
- Du kanske inte känner personen
- Ingen aning vad de gillar
- Slutar med generiska presenter (choklad, ljus...)
- Folk blir "meh" över sina gåvor

**Vår lösning:**
- AI matchar baserat på intressen (inte random!)
- AI föreslår perfekta presenter
- Anonym chatt för att få mer info
- Alla blir glada!

---

## 💡 HUR FUNGERAR VÅRAPP?

### Användarflöde:

**Steg 1: Organisatören skapar event**
```
"Kontorets Julklapp 2025"
Budget: 200-400 kr
Deadline: 20 december
```

**Steg 2: Alla registrerar sig**
```
Namn: Lisa Andersson
Email: lisa@example.com
Intressen: Böcker, löpning, kaffe
Hobbies: Fantasy-romaner, trail running
Budget-preferens: 300-400 kr
Allergier: Nötter
Gillar INTE: Choklad
```

**Steg 3: AI Matchar (när alla registrerat sig)**
```
Claude Opus 4.5 analyserar:
- Vem förstår vems intressen bäst?
- Vem kan hitta bra present åt vem?
- Budget-kompatibilitet
- Undvik konflikter

Exempel matchning:
Lisa (böcker) ← matchas med → Sven (också bokälskare)
→ Sven VET vad Lisa gillar!

Jonas (tech) ← matchas med → Anna (tech-intresserad)
→ Anna kan ge coola prylar
```

**Steg 4: Få din match + AI-presentförslag**
```
Sven får mejl:
"Du ska ge till Lisa!"

AI föreslår 5 presenter:
1. "The Midnight Library" - 179 kr
   📚 Varför: Lisa älskar fantasy-romaner
   🛒 Köp på: Adlibris

2. Boklampa - 299 kr
   💡 Varför: Lisa läser ofta på kvällen
   🛒 Köp på: Amazon

3. Löpar-armband - 249 kr
   🏃 Varför: Lisa springer trail
   🛒 Köp på: XXL
```

**Steg 5: Anonym chatt (valfritt)**
```
Sven vill veta mer men kan inte fråga direkt!

Anonymt meddelande till Lisa:
"Föredrar du deckare eller fantasy?"

Lisa svarar:
"Fantasy, älskar Neil Gaiman!"

→ Sven vet exakt vad han ska köpa nu
```

**Steg 6: Julfest!**
```
Alla öppnar presenter
Lisa: "OMG The Midnight Library! Hur visste du?!"
Alla: *glada* (inga awkward ögonblick)
```

---

## 🎯 VARFÖR DENNA IDÉ VINNER

### 1. AI är Kärnan (inte bara en feature)
- Matchning-algoritm = 100% AI
- Presentförslag = 100% AI
- Moderation av meddelanden = AI

### 2. Praktiskt Problem Som Alla Känner Igen
- Alla har varit med om Secret Santa
- Alla har fått/gett dåliga presenter
- Alla önskar det var bättre

### 3. Perfekt Scope för 2.5h med 5 Personer
- **Frontend team (2 pers):** Formulär, dashboard, UI
- **AI engineer (1 pers):** Claude-integration, prompts
- **Backend (1 pers):** API routes, email, state
- **QA/Deploy (1 pers):** Testing, deployment, demo

### 4. Baserat på Faktiska Vinnare
Från research av 20+ hackathon-vinnare:
- ✅ Practical problem-solving
- ✅ Clear value proposition
- ✅ AI-driven core
- ✅ Easy to demo
- ✅ Relatable use case

### 5. Low Risk
- Ingen multiplayer complexity
- Ingen real-time requirements
- Ingen external APIs (bara Claude)
- Fungerar offline för demo

---

## 🏗️ TEKNISK ÖVERSIKT

### Tech Stack:
```
Frontend: Next.js 14 + React + Tailwind CSS
AI: Claude Opus 4.5 (via Anthropic API)
Backend: Next.js API Routes
State: Zustand eller React Context
Email: Resend eller SendGrid
Deploy: Vercel
Export: jsPDF (för PDF-export)
```

### Huvudfunktioner:
1. Event creation (organisatör)
2. Participant registration
3. AI matching algorithm
4. AI gift suggestions
5. Anonymous messaging
6. Email notifications
7. Dashboard (organizer + participant views)
8. PDF export

### Data Struktur:
```typescript
Event {
  id: string
  name: string
  budget: { min: number, max: number }
  deadline: Date
  participants: Participant[]
  matches: Match[]
}

Participant {
  id: string
  name: string
  email: string
  interests: string[]
  hobbies: string
  budget_preference: number
  dislikes: string[]
  allergies: string[]
}

Match {
  giver_id: string
  receiver_id: string
  confidence: number
  gift_suggestions: Gift[]
}

Gift {
  name: string
  price: number
  store: string
  link: string
  reasoning: string
  category: string
}
```

---

## 🎤 PITCH SCRIPT (2 min)

### 0-20s: Problemet
"Höj handen om du fått en dålig Secret Santa-present."
[Vänta på skratt]
"Random lottning funkar inte. Vi byggde något bättre."

### 20-40s: Lösningen
"Secret Santa AI Matchmaker använder Claude Opus 4.5 för att matcha personer baserat på intressen - inte random - och föreslå PERFEKTA julklappar."

### 40-70s: Demo
[Live demo av app]
1. Skapa event
2. Registrera deltagare (Lisa, Sven, Jonas...)
3. Klicka "Generera AI-matchningar"
4. Visa resultat: Lisa matchad med Sven
5. Visa AI-presentförslag till Lisa
6. Visa anonym chatt

### 70-100s: Magiken
"Vad gör detta speciellt?"
- AI-matchning (inte random)
- Personliga presenter (inte generiska)
- Anonym chatt (få detaljer utan att förstöra hemligheten)
- Tidsbesparing (slipp stress)

### 100-120s: Impact
"Föreställ dig att VARJE Secret Santa-present är perfekt. Inga fler awkward ögonblick. Inga slösade pengar. Bara glädje."

---

## 👥 TEAM ROLLFÖRDELNING (5 personer)

### Person 1-2: Frontend
**Ansvar:**
- React komponenter
- UI/UX design
- Jultema (färger, animationer, snöfall)
- Responsive design

**Tasks:**
- Setup-sida (skapa event)
- Registreringsformulär
- Dashboard-vyer
- Match reveal-sida
- Messaging-interface

### Person 3: AI Engineer (DU med Claude Code)
**Ansvar:**
- Claude API integration
- Matchning-algoritm prompt
- Presentförslag prompt
- Meddelandemoderation

**Tasks:**
- `/api/match` endpoint
- `/api/gifts` endpoint
- `/api/moderate` endpoint
- Prompt engineering

### Person 4: Backend/Data
**Ansvar:**
- API routes
- State management
- Email integration
- PDF-generering

**Tasks:**
- Data strukturer
- CRUD operations
- Email sender
- PDF export

### Person 5: Deploy & QA
**Ansvar:**
- Vercel deployment
- Testing
- Bug hunting
- Demo-prep
- Dokumentation

**Tasks:**
- Setup Vercel (minut 15)
- Kontinuerlig testing
- Skapa testdata
- Pitch deck
- Screenshots

---

## ⏱️ TIDSBUDGET (2h 45min)

```
0:00-0:15 | Team planning & setup
0:15-0:30 | Initial setup (klona starter kit, API keys)
0:30-1:30 | Core development (parallellt arbete)
1:30-2:15 | Feature complete + polish
2:15-2:35 | Integration & testing
2:35-2:45 | Demo prep
```

---

## 🎨 UI WIREFRAMES

### Landing Page:
```
┌────────────────────────────────────┐
│                                    │
│   🎅 Secret Santa AI Matchmaker    │
│                                    │
│   AI-driven julklappar som        │
│   faktiskt ger glädje!             │
│                                    │
│   [Skapa Event]  [Gå med Event]   │
│                                    │
│   ✨ Perfekta matchningar          │
│   🎁 Smarta presentförslag         │
│   💬 Anonym chatt                  │
│                                    │
└────────────────────────────────────┘
```

### Registreringsformulär:
```
┌────────────────────────────────────┐
│ Registrera dig för Secret Santa    │
├────────────────────────────────────┤
│ Namn: [____________]               │
│ Email: [____________]              │
│                                    │
│ Intressen (välj flera):            │
│ ☑ Böcker  ☑ Tech  ☐ Sport         │
│ ☐ Mat  ☐ Musik  ☑ Kaffe           │
│                                    │
│ Hobbies:                           │
│ [____________________]             │
│                                    │
│ Budget: [===●=====] 200-500 kr    │
│                                    │
│ Allergier/Gillar INTE:             │
│ [____________________]             │
│                                    │
│        [Registrera]                │
└────────────────────────────────────┘
```

### Match Reveal:
```
┌────────────────────────────────────┐
│ 🎅 Din Secret Santa Match!         │
├────────────────────────────────────┤
│ Du ska ge till: Lisa Andersson     │
│                                    │
│ 🎁 AI-Föreslagna Presenter:        │
│                                    │
│ 1. "The Midnight Library"          │
│    💰 179 kr | 📚 Fiction          │
│    Varför: Lisa älskar fantasy     │
│    [Köp på Adlibris]               │
│                                    │
│ 2. Boklampa                         │
│    💰 299 kr | 💡 Accessoar        │
│    Varför: Lisa läser på kvällen   │
│    [Köp på Amazon]                 │
│                                    │
│ ...                                │
│                                    │
│ 💬 [Skicka Anonymt Meddelande]     │
└────────────────────────────────────┘
```

---

## 🚨 RISKER & LÖSNINGAR

### Risk 1: AI för långsam
**Lösning:**
- Visa loading animation
- Cacha vanliga förslag
- Pre-generera för demo

### Risk 2: WiFi problem
**Lösning:**
- Deploya tidigt
- Spela in demo-video som backup
- Ha screenshots redo

### Risk 3: Team koordination
**Lösning:**
- Person 5 är koordinator
- Använd Git branches
- Tydliga ansvarsområden

---

## 📊 VARFÖR DETTA ÄR DIN BÄSTA CHANS

**Jämfört med andra idéer:**

| Kriterium | Secret Santa | Spel | Annat |
|-----------|--------------|------|-------|
| AI är kärnan | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ |
| Praktiskt värde | ⭐⭐⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐⭐ |
| Relaterbart | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ |
| Easy demo | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| Team på 5 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ |
| Risk level | LOW | MEDIUM | MEDIUM |

**Verdict:** Secret Santa = Säkraste vägen till vinst

---

## ✅ CHECKLISTA FÖR ONSDAG

**Innan hackathon:**
- [ ] Läs denna fil
- [ ] Läs CLAUDE_ADVANTAGE.md
- [ ] Förstå tech stack
- [ ] Testa Claude API key
- [ ] Ha pitch i huvudet

**Under hackathon:**
- [ ] Pitch idén till teamet (visa denna fil!)
- [ ] Fördela roller
- [ ] Följ tidsbudgeten
- [ ] Deploya tidigt
- [ ] Testa kontinuerligt

**Vid demo:**
- [ ] 2-min pitch
- [ ] Live demo
- [ ] Visa AI-magic
- [ ] Sluta med impact

---

## 🎯 SLUTSATS

**Secret Santa AI Matchmaker** är:
- ✅ Baserad på vinnande mönster
- ✅ Perfekt för team på 5
- ✅ Byggbar på 2.5h
- ✅ Praktisk + Kreativ + AI-driven
- ✅ Low risk, high reward

**Din jobbroll på onsdag:**
→ AI Engineer (Claude-integration)
→ Du har Opus 4.5 = maximal AI-kraft
→ Detta är din competitive advantage

**Förberedelse:**
→ Du HAR starter kit redo
→ Du HAR strategiguider
→ Du HAR /activate-superpowers
→ Du ÄR redo att vinna! 🔥

---

**Frågor?** Läs CLAUDE_ADVANTAGE.md och IDEA_SELECTOR.md för mer kontext.
