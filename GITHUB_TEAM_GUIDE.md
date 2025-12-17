# 🚀 GitHub Team Collaboration Guide - Hackathon Edition

**För:** Agentic Jul Hackathon 2025-12-18
**Team Size:** 5 personer
**Tid:** 2.5 timmar (varje minut räknas!)
**Projekt:** Grinch's Lost Gifts (2D Platformer)

---

## 🎯 SNABB SETUP (Första 5 Minuterna)

### Steg 1: Rickard Skapar Repot (1 minut)

```bash
# På GitHub.com
1. Klicka "New repository"
2. Namn: "grinch-game-agentic-jul"
3. Public ✅
4. Add README ✅
5. Add .gitignore (Node) ✅
6. License: MIT ✅
7. Create repository
```

### Steg 2: Klona Starter Kit (2 minuter)

```bash
# Rickard kör detta LIVE framför teamet
cd ~/Desktop
cp -r ~/hackathon-starter-kit grinch-game
cd grinch-game

# Initiera git
git init
git remote add origin https://github.com/[username]/grinch-game-agentic-jul.git
git pull origin main
git branch -M main

# Första commit
git add .
git commit -m "🎮 Initial setup - Grinch's Lost Gifts"
git push -u origin main
```

### Steg 3: Lägg Till Alla Teammedlemmar (1 minut)

```bash
# På GitHub.com → Settings → Collaborators
Lägg till alla 5 personer som collaborators
Alla accepterar invite (mobiltelefon!)
```

### Steg 4: Alla Klonar Repot (1 minut)

```bash
# Varje teammedlem kör:
cd ~/Desktop
git clone https://github.com/[username]/grinch-game-agentic-jul.git
cd grinch-game-agentic-jul
npm install
```

---

## 🌿 BRANCH STRATEGY (Super Enkel)

### Main Branch Protection
```
main = ENDAST FUNGERANDE KOD
     = Deployment source
     = Vercel auto-deploy
```

### Feature Branches (En per person)

```
main
 ├── rickard/ai-integration
 ├── person2/game-mechanics
 ├── person3/level-design
 ├── person4/ui-sound
 └── person5/deployment
```

### Skapa Din Branch

```bash
# Person 1 (Rickard - AI):
git checkout -b rickard/ai-integration

# Person 2 (Game Mechanics):
git checkout -b game-mechanics

# Person 3 (Level Design):
git checkout -b level-design

# Person 4 (UI/Sound):
git checkout -b ui-sound

# Person 5 (QA/Deploy):
git checkout -b deployment
```

---

## 💻 DAGLIGT ARBETSFLÖDE

### 1. Börja Arbeta (När du sätter dig)

```bash
# Hämta senaste från main
git checkout main
git pull origin main

# Gå tillbaka till din branch
git checkout [din-branch]
git merge main  # Få senaste ändringarna
```

### 2. Medan Du Jobbar (Varje 15-20 min)

```bash
# Spara ditt arbete lokalt
git add .
git commit -m "feat: beskrivning av vad du gjort"
git push origin [din-branch]
```

**Commit Message Format:**
```
feat: Add player jump mechanics
fix: Resolve collision detection bug
style: Update Christmas theme colors
docs: Add level design documentation
```

### 3. Klar Med Feature? Merge Till Main

**VIKTIGT: Testa lokalt FÖRST!**

```bash
# Testa att allt funkar
npm run dev  # Kolla att det ser bra ut
npm run build  # Måste lyckas!

# Om build lyckas:
git checkout main
git pull origin main
git merge [din-branch]
git push origin main

# Gå tillbaka till din branch
git checkout [din-branch]
```

---

## 🚨 KONFLIKT-HANTERING (När Två Redigerar Samma Fil)

### Scenario: Merge Conflict

```bash
git merge main
# ERROR: Merge conflict in src/game/player.ts

# Öppna filen, se något sånt här:
<<<<<<< HEAD
const jumpForce = 500;  // Din version
=======
const jumpForce = 600;  // Någon annans version
>>>>>>> main

# Välj rätt version (eller kombinera):
const jumpForce = 600;  // Bestäm tillsammans!

# Spara filen, sedan:
git add src/game/player.ts
git commit -m "fix: resolve merge conflict in jump force"
git push origin [din-branch]
```

### Undvik Konflikter

**REGEL:** Prata INNAN ni redigerar samma fil!

```bash
# BEFORE editing src/game/player.ts:
"Hallå, någon som jobbar med player.ts just nu?"
```

---

## 📁 ARBETSOMRÅDEN (Vem Äger Vilka Filer)

### Person 1 - Rickard (AI Engineer)
```
DIN KOD:
├── lib/claude.ts
├── app/api/generate-level/route.ts
├── app/api/customize-character/route.ts
├── app/api/adapt-difficulty/route.ts
└── prompts/
    ├── level-generation.ts
    └── character-customization.ts

BRANCH: rickard/ai-integration
COMMIT PREFIX: "ai:" eller "feat:"
```

### Person 2 (Game Developer)
```
DIN KOD:
├── src/game/
│   ├── player.ts
│   ├── physics.ts
│   ├── collision.ts
│   └── game-loop.ts
└── src/components/GameCanvas.tsx

BRANCH: game-mechanics
COMMIT PREFIX: "game:" eller "feat:"
```

### Person 3 (Level Designer)
```
DIN KOD:
├── src/game/
│   ├── level-manager.ts
│   ├── platform-generator.ts
│   └── gift-spawner.ts
├── public/assets/
│   ├── platforms/
│   ├── gifts/
│   └── backgrounds/
└── data/
    └── level-templates.json

BRANCH: level-design
COMMIT PREFIX: "level:" eller "assets:"
```

### Person 4 (UI/UX + Sound)
```
DIN KOD:
├── src/components/
│   ├── StartScreen.tsx
│   ├── GameHUD.tsx
│   ├── CharacterCustomizer.tsx
│   └── EndScreen.tsx
├── app/globals.css
└── public/sounds/
    ├── jump.mp3
    ├── collect.mp3
    └── background-music.mp3

BRANCH: ui-sound
COMMIT PREFIX: "ui:" eller "sound:"
```

### Person 5 (QA/Deploy)
```
DIN KOD:
├── tests/
│   ├── game.test.ts
│   └── api.test.ts
├── vercel.json
├── README.md
└── docs/
    ├── DEMO_SCRIPT.md
    └── SETUP.md

BRANCH: deployment
COMMIT PREFIX: "test:" eller "docs:" eller "deploy:"
```

---

## ⚡ SNABBA KOMMANDON (Cheatsheet)

```bash
# Se status
git status

# Se vilken branch du är på
git branch

# Byt branch
git checkout [branch-name]

# Hämta senaste från remote
git pull origin main

# Spara ditt arbete
git add .
git commit -m "beskrivning"
git push origin [din-branch]

# Merge main till din branch
git checkout [din-branch]
git merge main

# Merge din branch till main (när klar)
git checkout main
git merge [din-branch]
git push origin main

# Se commit history
git log --oneline --graph

# Ångra senaste commit (behåll ändringar)
git reset --soft HEAD~1

# Kasta allt och börja om
git reset --hard HEAD
git clean -fd
```

---

## 🔄 INTEGRATION POINTS (När Kod Måste Mötas)

### Timeline: När Ni Mergar Till Main

```
0:30 | Person 2 → main
     | Basic game canvas + player movement
     | Detta är GRUNDEN - alla väntar på detta!

0:45 | Person 3 → main
     | Platform rendering (static)
     | Nu kan Person 2 fortsätta med collision

1:00 | Person 1 → main
     | AI level generation API endpoint
     | Person 3 kan nu testa AI-genererade banor

1:15 | Person 4 → main
     | Start screen + basic UI
     | Nu ser spelet proffsigt ut

1:30 | Person 2 → main
     | Collision detection + gift collection
     | Spelmekanik komplett

1:45 | Person 3 → main
     | AI-generated levels integration
     | Nu använder vi AI fullt ut

2:00 | Person 4 → main
     | Sound effects + Christmas polish
     | Spelet känns färdigt

2:15 | Person 1 → main
     | Character customization + difficulty
     | Alla AI-features klara

2:30 | Person 5 → main
     | FINAL BUILD + deployment
     | Allt pushat till Vercel
```

---

## 🚨 NÖDSITUATIONER

### "Någon har pushat trasig kod till main!"

```bash
# Person 5 (QA) fixar detta:
git log --oneline  # Hitta senaste fungerande commit
git revert [commit-hash]
git push origin main

# Säg till personen som pushade:
"Din kod bröt build, jag revertade. Fixa på din branch först!"
```

### "Jag har gjort fel och allt är kaos"

```bash
# Kasta allt lokalt och börja om:
git fetch origin
git reset --hard origin/main
git clean -fd

# Nu är du synkad med main igen
```

### "Vercel bygger inte!"

```bash
# Check build lokalt:
npm run build

# Om det funkar lokalt men inte på Vercel:
# 1. Kolla Vercel logs på dashboard
# 2. Kolla att alla env vars är satta
# 3. Kolla att package.json är korrekt
```

---

## 📋 CHECKLISTA FÖR VARJE MERGE

Innan du kör `git push origin main`:

```bash
✅ npm run build         # Måste lyckas
✅ Testa i webbläsare    # Ser det rätt ut?
✅ Kolla console         # Inga errors?
✅ Kör git status        # Allt committat?
✅ Kör git pull          # Senaste från main?
```

---

## 🎯 KOMMUNIKATION

### Discord/Slack Channels (Skapa Dessa!)

```
#general          - Allmän chatt
#git-updates      - Bot som postar commits (GitHub webhook)
#merge-requests   - "Ska merga nu, okej?"
#blockers         - "Jag är blockerad av X"
#demo-prep        - Screenshots, demo script
```

### När Ska Du Ropa?

```bash
# 🔴 ROPA DIREKT:
- "Build är trasig!"
- "Kan inte pusha!"
- "Merge conflict jag inte förstår"

# 🟡 FRÅGA INNAN:
- "Ska merga till main nu"
- "Ska ändra i fil X som du kanske också rör"

# 🟢 INFORMERA:
- "Feature X klar, mergat till main"
- "Hittat en bug i Y, fixar"
```

---

## 🏆 SUCCESS METRICS

### Efter Hackathon - Bra Git Hygien Ser Ut Så Här:

```bash
git log --oneline --graph

# Bra exempel:
* a1b2c3d (HEAD -> main) deploy: Final build to Vercel
* d4e5f6g ui: Add sound effects and Christmas theme
* g7h8i9j game: Complete collision detection
* j0k1l2m ai: Character customization endpoint
* m3n4o5p level: AI-generated platforms integration
* p6q7r8s game: Basic player movement
* s9t0u1v Initial setup - Grinch's Lost Gifts
```

### Röda Flaggor (Undvik Detta):

```bash
❌ "fixed stuff"
❌ "asdf"
❌ "THIS SHOULD WORK NOW"
❌ "merge conflict idk"
❌ 50+ commits på 10 minuter (commita rimligt ofta!)
```

---

## 🎮 DEMO DAY - FINAL PUSH

### 15 Minuter Före Deadline

```bash
# Person 5 koordinerar:

# 1. Frys all utveckling
"STOP CODING - vi bygger nu!"

# 2. Final merge
git checkout main
git pull origin main
npm run build  # Måste lyckas

# 3. Push till Vercel
git push origin main
# Vänta på Vercel deploy (2-3 min)

# 4. Testa live URL
# Öppna på mobil + desktop
# Klicka igenom hela flödet

# 5. Ta screenshots
# Spara till docs/demo-screenshots/

# 6. Klar! 🎉
```

---

## 📊 GIT STATS (Kul att Köra Efter)

```bash
# Se vem som committat mest
git shortlog -sn

# Se kodstatistik
git log --stat

# Se teamets aktivitet över tid
git log --graph --all --oneline --decorate
```

---

## 🎯 TL;DR - DE 5 VIKTIGASTE REGLERNA

1. **TESTA INNAN DU MERGAR TILL MAIN**
   - `npm run build` måste lyckas

2. **EN BRANCH PER PERSON**
   - Håll dig på din branch, merga bara när klar

3. **COMMIT OFTA (var 15-20 min)**
   - Small commits = lätt att hitta buggar

4. **KOMMUNICERA INNAN MERGE**
   - "Mergar till main nu!" i chatten

5. **PERSON 5 HAR SISTA ORDET**
   - QA/Deploy person godkänner final merge

---

## 🚀 LYCKA TILL!

**Remember:**
- Git är ert verktyg, inte er fiende
- Kommunikation > perfekta commits
- Working code > clean history
- Ship it! 🚢

**När tveksam:**
```bash
git status  # Var är jag?
git log     # Vad hände?
git diff    # Vad ändrade jag?
```

**Och framför allt:**
```bash
# Fråga teamet!
"Hur gör jag X?"
> Bättre än att gissa och göra fel
```

🎄 **NU KOOOOÖR VI!** 🎄
