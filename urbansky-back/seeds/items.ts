import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("items").del();

    // Inserts seed entries
    await knex("items").insert([
        {serial: 21, name: 'Latex', description: 'Quality latex for balloon construction.', quantity: 237},
        {serial: 22, name: 'Paracord', description: 'Braided nylon utility rope. Weather resistant, capable of safely supporting 550lbs.', quantity: 783},
        {serial: 23, name: 'Radiosonde', description: 'Radio transmitter. Battery powered, measures atmospheric conditions and transmits them by radio to the ground', quantity: 67},
        {serial: 24, name: 'Hydrogen Canister', description: 'Pressurized canister of 99.999% pure hydrogren gas, 17 liters.', quantity: 53},
        {serial: 25, name: 'Helium Canister', description: 'Pressurized canister of professional grade helium gas, 40 cubic feet.', quantity: 17},
        {serial: 26, name: 'Sounding Rocket', description: 'Instrument carrying rocket used to carry objects to between 48 and 145 km.', quantity: 4},
        {serial: 27, name: 'Stratoflights™  Space Cam', description: '4K 60fps camera, custom designed to capture high resolution arial photography and to withstand inhospitable stratospheric consitions', quantity: 16},
        {serial: 28, name: 'Branded Ballpoint Pen', description: 'Urban Sky™ branded ballpoint pen. Blue ink, clickable. Can be used to write on many surfaces, or to pop balloons.', quantity: 1563},
    ]);
};
