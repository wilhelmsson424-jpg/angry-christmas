# 🎯 GRINCH SMASHER - ACTION PLAN FÖR HACKATHON

**Event:** Agentic Jul - 18 December 2025
**Tid:** 2h 45min
**Team:** 5 personer
**Din Roll:** AI Engineer (Person 1)

---

## ⏰ TIDSLINJE FÖR DIG

### Minut 0-5: Team Pitch
```
"Hej alla! Jag föreslår Grinch Smasher:

- Whack-a-mole spel med julhuvuden
- Vi tar selfies som blir karaktärer
- React Native + Expo (native mobile!)
- Jag har komplett prompt redo att köra

Vem gör vad?"

Roller:
Person 1 (DIG): AI/Game Logic + Expo setup
Person 2: UI/UX + Grafik (skorstenar, bakgrund)
Person 3: Testing + Deployment
Person 4: Sound effects + Polish
Person 5: Demo prep + Presentation
```

### Minut 5-15: Project Setup
```bash
# Person som har GitHub skapar repo
cd ~/Desktop
npx create-expo-app grinch-smasher --template blank-typescript

cd grinch-smasher
npm install expo-camera expo-image-manipulator @react-native-async-storage/async-storage

# Git setup
git init
git remote add origin https://github.com/[username]/grinch-smasher.git
git add .
git commit -m "Initial setup"
git push -u origin main

# Alla andra klonar
git clone https://github.com/[username]/grinch-smasher.git
cd grinch-smasher
npm install
npx expo start
```

**✅ CHECKPOINT:** Alla har appen på sina telefoner!

### Minut 15-20: Din Branch + Claude Prompt
```bash
# Skapa din branch
git checkout -b rickard/game-logic
git push -u origin rickard/game-logic

# Öppna GRINCH_SMASHER_PROMPT.md
# Kopiera hela prompten till Claude Opus 4.5
# Börja med Steg 1
```

### Minut 20-60: Core Gameplay (KRITISK PERIOD)
```
✅ Steg 1: Project setup (redan klart)
✅ Steg 2: Selfie screen (20 min) - DU
✅ Steg 3: Bildbehandling (15 min) - DU
✅ Steg 4: Game board (30 min) - DU + Person 2 (UI)
```

**Parallellt arbete:**
- Person 2: Designar skorstenar, bakgrund
- Person 3: Testar på olika enheter
- Person 4: Hittar ljudeffekter

**COMMIT VAR 20:e MIN!**

### Minut 60-90: Gameplay Logic
```
✅ Steg 5: Spawn logic (25 min) - DU
✅ Steg 6: Interaktion + Score (15 min) - DU
```

**Parallellt:**
- Person 2: Integrerar grafik i game board
- Person 4: Förbereder ljudeffekter

### Minut 90-120: Game Loop + Integration
```
✅ Steg 7: Timer + Game over (20 min) - DU

# MERGE TILL MAIN (KRITISK DEADLINE!)
git checkout main
git pull origin main
git merge rickard/game-logic
npm run build  # Testa att det bygger
git push origin main
```

**✅ CHECKPOINT 2:00:** Core game funkar!

### Minut 120-150: Polish (Om Tid Finns)
```
⭐ Steg 8: Animations (15 min) - Person 2
⭐ Steg 9: Highscore (10 min) - DU
⭐ Steg 10: Polish (10 min) - Person 4
```

**DIN UPPGIFT:** Hjälp andra med integration + bugfixes

### Minut 150-165: Final Testing + Deploy
```
# Person 3 kör detta:
npx expo publish  # Eller
eas build --platform android --profile preview

# Alla testar:
- Selfie fungerar?
- Spawn fungerar?
- Score fungerar?
- Timer fungerar?
- Inga crashes?
```

**DU:** QA + fixa sista buggar

### Minut 165: DEMO TIME! 🎤
```
Person 5 presenterar:
"Grinch Smasher - ta selfie, bli julhuvud, slå så många som möjligt!"

*Visar live demo på telefon*

DU står bredvid och kan svara på tekniska frågor:
- "Vi använder Expo + React Native för native mobile"
- "Bildbehandling med Expo Image Manipulator"
- "Spawn-system med smart timing-algoritm"
- "Built in 2h 45min med Claude Opus 4.5 support"
```

---

## 🚨 NÖDSITUATIONER

### Om Expo Kamera Failar
```bash
npm install expo-image-picker
# Använd image picker istället - tar 5 min att byta
```

### Om Spawn Logic Blir Buggy
```javascript
// Använd enklare version:
setInterval(() => {
  const randomCell = Math.floor(Math.random() * 9);
  showHead(randomCell);
  setTimeout(() => hideHead(randomCell), 1000);
}, 1500);
```

### Om Animationer Laggar
```javascript
// Ta bort animations, använd direkt show/hide
{visible && <Image source={{uri: headImage}} />}
```

### Om Tid Tar Slut (< 30 min kvar)
**SKIPPA:**
- Steg 8 (animations)
- Steg 9 (highscore)
- Steg 10 (polish)

**FOKUSERA PÅ:**
- Fungerande gameplay
- Inga crashes
- Demo-redo

---

## 📋 PRE-HACKATHON CHECKLIST

**Ikväll (Innan Hackathon):**
- [ ] Laptop laddad till 100%
- [ ] Telefon laddad till 100%
- [ ] Expo Go installerat på telefon
- [ ] `GRINCH_SMASHER_PROMPT.md` öppen och redo
- [ ] GitHub account verifierat
- [ ] Laddare + kablar packade
- [ ] Läst HACKATHON_DAY_GUIDE.md

**På Morgonen:**
```bash
# Kör en sista verifiering
cd ~/hackathon-starter-kit
bash activate-superpowers.sh
# Score ska vara 90/100
```

**På Venue:**
- [ ] Anslut till WiFi omedelbart
- [ ] Testa `npx expo start` fungerar
- [ ] Introduce yourself to team
- [ ] Öppna `GRINCH_SMASHER_PROMPT.md` i VS Code

---

## 💡 PRO TIPS

### Git Workflow
```bash
# Commit ofta
git add .
git commit -m "feat: add spawn logic"
git push

# Merge till main vid milestones
git checkout main
git merge rickard/game-logic
git push
```

### Claude Workflow
```
1. Kopiera ett Steg från prompten
2. Ge till Claude: "Implementera Steg X"
3. Claude genererar kod
4. Testa koden
5. Be om fixes vid bugs
6. När funkar: Nästa steg
```

### Kommunikation
```
Slack/Discord till teamet:
"✅ Selfie screen klar - 20 min"
"⏳ Spawn logic pågår - 10 min kvar"
"🆘 Blockerad - behöver hjälp med X"
"🎉 Core gameplay DONE! Mergar till main"
```

---

## 🎯 SUCCESS METRICS

**Minimum Success:**
- ✅ App startar utan crash
- ✅ Kan ta selfie
- ✅ Julhuvuden spawnar
- ✅ Kan trycka och få poäng
- ✅ Timer fungerar

**Full Success:**
- ✅ Ovanstående + smooth animations
- ✅ Highscore sparas
- ✅ Multiplier system
- ✅ Professionell UI
- ✅ Ljudeffekter

**Winning Success:**
- ✅ Full Success + imponerande demo
- ✅ Ingen bugs under demo
- ✅ Bra pitch från Person 5
- ✅ Judges säger "WOW"

---

## 📞 EMERGENCY CONTACTS

**Om något går fel:**
- Anthropic API: https://console.anthropic.com
- Expo docs: https://docs.expo.dev
- Natively support: support@natively.dev

**Teamet:**
- Person 5 (Koordinator) - ropa om blockers
- Person 3 (QA) - rapportera bugs till
- Person 2 (UI) - samarbeta med på Steg 4

---

## 🏆 FINAL PEP TALK

**Du har:**
- ✅ Komplett prompt (GRINCH_SMASHER_PROMPT.md)
- ✅ Claude Opus 4.5 (bästa modellen)
- ✅ 2 veckors förberedelse
- ✅ Expo-erfarenhet från test-projektet
- ✅ Combat Readiness: 90/100

**Du kommer:**
- 🔥 Bygga core gameplay på < 2 timmar
- 🔥 Imponera teamet
- 🔥 Leverera fungerande demo
- 🔥 Ha kul!

**LÅT OSS VINNA DETTA! 🚀🎮🎄**

---

**Skapad:** 2025-12-17
**För:** Agentic Jul Hackathon 2025-12-18
**Status:** REDO ATT DOMINERA
