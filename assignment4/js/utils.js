const scareTexts = ["", "Mysigt", "Lite läskigt", "Obehagligt", "Skräckinjagande", "Ren terror"];


export function scareLevelText(level) {
    return scareTexts[level] ?? "Okänd";
}


export function getAllGhostTypes(houses) {
    const types = [];


    for (const house of houses) {
        for (const type of house.ghostTypes) {
            if (!types.includes(type)) {
                types.push(type);
            }
        }
    }


    return types;
}

export function getHouseById(houses, id) {
    return houses.find(house => house.id === id);
}


export async function fetchHouses() {
    try {
        const response = await fetch("data/houses.json");
        const data = await response.json();
        return data;
    } catch (error) {
        return null;
    }
}

export function showError(elementId, message) {
    const el = document.getElementById(elementId);
    if (!el) return;
    el.textContent = message;
    el.classList.remove("hidden");
}


export function hideError(elementId) {
    const el = document.getElementById(elementId);
    if (!el) return;
    el.classList.add("hidden");
}