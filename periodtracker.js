// Menstrual Cycle Prediction - Small Widget

// --- User Settings ---
const lastPeriod = "2024-05-16"; // YYYY-MM-DD
const cycleLength = 30; // Average cycle length in days
const periodLength = 5; // Average period length in days

// --- Calculations -ww--
const lastDate = new Date(lastPeriod);
const today = new Date();
const msPerDay = 24 * 60 * 60 * 1000;

let nextPeriodStart = new Date(lastDate.getTime());
while (nextPeriodStart < today) {
  nextPeriodStart = new Date(nextPeriodStart.getTime() + cycleLength * msPerDay);
}
const nextPeriodEnd = new Date(nextPeriodStart.getTime() + (periodLength - 1) * msPerDay);
const daysLeft = Math.ceil((nextPeriodStart - today) / msPerDay);

// --- Color Calculation ---
function getColor(daysLeft, maxDays) {
  // White (255,255,255) to Red (255,0,0)
  let ratio = Math.max(0, Math.min(1, 1 - daysLeft / maxDays));
  let r = 255;
  let g = Math.round(255 * (1 - ratio));
  let b = Math.round(255 * (1 - ratio));
  return Color.rgb(r, g, b); // <-- FIXED: use Color.rgb
}
const daysLeftColor = getColor(daysLeft, cycleLength);

// --- Small Widget Display ---
let w = new ListWidget();
w.addText("Next Period").font = Font.boldSystemFont(14);
w.addSpacer(4);

if (today >= nextPeriodStart && today <= nextPeriodEnd) {
  let periodText = w.addText("Period now, take med");
  periodText.textColor = Color.red();
  periodText.font = Font.boldSystemFont(13);
  w.addSpacer(2);
  w.addText(`Ends: ${nextPeriodEnd.toLocaleDateString()}`).font = Font.systemFont(10);
} else {
  w.addText(nextPeriodStart.toLocaleDateString()).font = Font.mediumSystemFont(13);
  let daysLeftText = w.addText(`In ${daysLeft} day${daysLeft !== 1 ? "s" : ""}`);
  daysLeftText.font = Font.boldSystemFont(12);
  daysLeftText.textColor = daysLeftColor;
  w.addSpacer(2);
  w.addText(`Ends: ${nextPeriodEnd.toLocaleDateString()}`).font = Font.systemFont(10);
}

if (config.runsInWidget) {
  Script.setWidget(w);
} else {
  w.presentSmall();
}
Script.complete();