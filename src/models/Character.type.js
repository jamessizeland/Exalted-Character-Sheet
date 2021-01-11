const mongoose = require("mongoose");

// https://mongoosejs.com/docs/guide.html

const NumericSchema = new mongoose.Schema({
  type: Number,
  default: 1,
  required: true,
});
const textSchema = new mongoose.Schema({
  type: String,
  trim: true,
  default: "",
  required: false,
});

const CharacterSchema = new mongoose.Schema({
  //By default, Mongoose adds an _id property to your schemas
  bio: {
    name: {
      type: String,
      trim: true,
      required: [true, "Your character must be named"],
    },
    caste: {
      type: String,
      default: "Dusk",
      enum: ["Dusk", "Midnight", "Daybreak", "Day", "Moonshadow"],
      required: [true, "Which caste does your character belong to?"],
    },
    motivation: {
      type: String,
      trim: true,
      required: [false, "What motivates your character?"],
    },
    flawedVirtue: {
      type: String,
      trim: true,
      required: [false, "What motivates your character?"],
    },
    anima: {
      type: String,
      trim: true,
      required: [false, "What motivates your character?"],
    },
    virtues: {
      compassion: NumericSchema,
      conviction: NumericSchema,
      temperance: NumericSchema,
      valour: NumericSchema,
    },
    backgrounds: {
      type: [{ name: String, value: Number }],
      required: false,
    },
  },
  meta: {
    creator: {
      type: String,
      trim: true,
      required: [true, "User is required"],
    },
    created: {
      type: Date,
      default: Date.now,
    },
    modified: {
      type: Date,
      default: Date.now,
    },
    bonuses: {
      resonance: NumericSchema,
      willpower: NumericSchema,
      essence: NumericSchema,
      soak: {
        bashing: NumericSchema,
        lethal: NumericSchema,
        aggravated: NumericSchema,
      },
      healthTotals: [NumericSchema],
    },
    temporary: {
      experience: NumericSchema,
      damage: [NumericSchema],
      essencePools: [NumericSchema],
    },
  },
  attributes: {
    physical: {
      strength: NumericSchema,
      dexterity: NumericSchema,
      stamina: NumericSchema,
    },
    social: {
      charisma: NumericSchema,
      manipulation: NumericSchema,
      appearance: NumericSchema,
    },
    mental: {
      perception: NumericSchema,
      intelligence: NumericSchema,
      wits: NumericSchema,
    },
  },
  abilities: {
    dusk: {
      archery: NumericSchema,
      martial: NumericSchema,
      melee: NumericSchema,
      thrown: NumericSchema,
      war: NumericSchema,
    },
    midnight: {
      integrity: NumericSchema,
      performance: NumericSchema,
      presence: NumericSchema,
      resistance: NumericSchema,
      survival: NumericSchema,
    },
    daybreak: {
      craft: NumericSchema,
      investigation: NumericSchema,
      lore: NumericSchema,
      medicine: NumericSchema,
      occult: NumericSchema,
    },
    day: {
      athletics: NumericSchema,
      awareness: NumericSchema,
      dodge: NumericSchema,
      larceny: NumericSchema,
      stealth: NumericSchema,
    },
    moonshadow: {
      bureaucracy: NumericSchema,
      linguistics: NumericSchema,
      ride: NumericSchema,
      sail: NumericSchema,
      socialise: NumericSchema,
    },
    specialties: {
      type: [{ value: NumericSchema, text: String }],
    },
  },
  equipment: {
    weapons: [textSchema],
    artifacts: [textSchema],
    armour: [textSchema],
    stuff: [textSchema],
  },
  charms: [textSchema],
});

module.exports = mongoose.model("Character", CharacterSchema);
