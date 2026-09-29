// Used to count how many days have passed since my cat got a new can of food
//Tap the widget to change the tracking start date to today

// Set up 
//1. Long-press your home screen widget and tap Edit Widget.
//2. Set Interacting to "Run Script".

// --- CONFIGURATION ---
const KEYCHAIN_KEY = "day_counter_start_date";
const EVENT_NAME = "Days Since Last Can"; // Change this to your event title

// Get or initialize the start date
let startDateStr = Keychain.contains(KEYCHAIN_KEY) ? Keychain.get(KEYCHAIN_KEY) : null;

// If this is a tap interaction to reset the date
if (args.queryParameters.action === "reset") {
  const todayStr = new Date().toISOString().split('T')[0];
  Keychain.set(KEYCHAIN_KEY, todayStr);
  startDateStr = todayStr;
}

// Default fallback if no date exists yet (set to today)
if (!startDateStr) {
  startDateStr = new Date().toISOString().split('T')[0];
  Keychain.set(KEYCHAIN_KEY, startDateStr);
}

// Calculate days passed
const startDate = new Date(startDateStr);
const today = new Date();
// Strip hours to ensure accurate day tracking
startDate.setHours(0,0,0,0);
today.setHours(0,0,0,0);

const diffTime = Math.abs(today - startDate);
const daysPassed = Math.floor(diffTime / (1000 * 60 * 60 * 24));

// --- UI WIDGET DESIGN ---
const widget = new ListWidget();
widget.backgroundColor = new Color("#1c1c1e");

// Interaction: Tapping the widget triggers this script with a reset command
widget.url = URLScheme.forRunningScript() + "?action=reset";

const titleText = widget.addText(EVENT_NAME);
titleText.font = Font.systemFont(14);
titleText.textColor = new Color("#8e8e93");

widget.addSpacer(4);

const countText = widget.addText(daysPassed.toString());
countText.font = Font.boldSystemFont(42);
countText.textColor = new Color("#ff9500"); // Orange count text

widget.addSpacer(2);

const labelText = widget.addText("days");
labelText.font = Font.systemFont(12);
labelText.textColor = new Color("#aeaeae");

if (config.runsInWidget) {
  Script.setWidget(widget);
} else {
  widget.presentSmall();
}
Script.complete();
