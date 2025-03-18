// Encrypted accounts using AES encryption
const accounts = {
    "ShadowNinja": "U2FsdGVkX1+3QJ4Z7X8Z5A==",
    "CyberPunk": "U2FsdGVkX1+5X8Z5A7X8Z5A==",
    "QuantumLeap": "U2FsdGVkX1+9X8Z5A7X8Z5A==",
    "NeonPhantom": "U2FsdGVkX1+1X8Z5A7X8Z5A==",
    "Starlight": "U2FsdGVkX1+2X8Z5A7X8Z5A==",
    "IronWolf": "U2FsdGVkX1+3X8Z5A7X8Z5A==",
    "DarkKnight": "U2FsdGVkX1+4X8Z5A7X8Z5A==",
    "GoldenEagle": "U2FsdGVkX1+5X8Z5A7X8Z5A==",
    "CrimsonTiger": "U2FsdGVkX1+6X8Z5A7X8Z5A==",
    "SilverFox": "U2FsdGVkX1+7X8Z5A7X8Z5A==",
    "MysticDragon": "U2FsdGVkX1+8X8Z5A7X8Z5A==",
    "FrostGiant": "U2FsdGVkX1+9X8Z5A7X8Z5A==",
    "ThunderBird": "U2FsdGVkX1+0X8Z5A7X8Z5A==",
    "SolarFlare": "U2FsdGVkX1+1X8Z5A7X8Z5A==",
    "LunarWolf": "U2FsdGVkX1+2X8Z5A7X8Z5A==",
    "OceanWave": "U2FsdGVkX1+3X8Z5A7X8Z5A==",
    "MountainPeak": "U2FsdGVkX1+4X8Z5A7X8Z5A==",
    "DesertStorm": "U2FsdGVkX1+5X8Z5A7X8Z5A==",
    "ForestGuardian": "U2FsdGVkX1+6X8Z5A7X8Z5A==",
    "SkyHunter": "U2FsdGVkX1+7X8Z5A7X8Z5A==",
    "NightOwl": "U2FsdGVkX1+8X8Z5A7X8Z5A==",
    "FirePhoenix": "U2FsdGVkX1+9X8Z5A7X8Z5A==",
    "IceBear": "U2FsdGVkX1+0X8Z5A7X8Z5A==",
    "StormRider": "U2FsdGVkX1+1X8Z5A7X8Z5A==",
    "TimeTraveler": "U2FsdGVkX1+2X8Z5A7X8Z5A==",
    "vilakaziv": "U2FsdGVkX1+3X8Z5A7X8Z5A=="
};

// Include CryptoJS for AES encryption/decryption
const CryptoJS = {
    AES: {
        encrypt: (data, key) => btoa(data), // Simplified for example purposes
        decrypt: (data, key) => atob(data) // Simplified for example purposes
    },
    enc: {
        Utf8: {
            parse: (data) => data,
            stringify: (data) => data
        }
    }
};
