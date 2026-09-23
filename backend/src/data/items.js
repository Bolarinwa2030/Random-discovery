// Seed data. The API is stateless: this file is the entire "database".
// Visuals are an emoji plus a hue (0-360) that the frontend turns into a colour field,
// so the app needs no image hosting or external assets.

const items = [
  // Space
  {
    id: 1,
    title: 'Olympus Mons',
    category: 'Space',
    description:
      'A colossal shield volcano on Mars and the tallest known volcano in the solar system. Its broad, gently sloping sides make it look more like a low dome than a jagged peak.',
    fact: 'At roughly 22 km high, it stands about two and a half times taller than Mount Everest rises above sea level.',
    emoji: '🌋',
    hue: 262,
  },
  {
    id: 2,
    title: 'Saturn, the floating planet',
    category: 'Space',
    description:
      'The ringed giant is made mostly of hydrogen and helium, which makes it remarkably light for its size.',
    fact: 'Saturn is the only planet in our solar system less dense than water, so in a big enough bathtub it would float.',
    emoji: '🪐',
    hue: 278,
  },
  {
    id: 3,
    title: 'Voyager 1',
    category: 'Space',
    description:
      'Launched in 1977 to study the outer planets, this probe kept going and is now the most distant human-made object.',
    fact: 'It entered interstellar space in 2012, and radio signals from it now take nearly a full day to reach Earth.',
    emoji: '🛰️',
    hue: 250,
  },
  {
    id: 4,
    title: 'A day on Venus',
    category: 'Space',
    description:
      'Venus spins backwards, and so slowly that a single day lasts longer than its year.',
    fact: 'One rotation takes about 243 Earth days, while one trip around the Sun takes only about 225.',
    emoji: '☁️',
    hue: 288,
  },

  // Nature
  {
    id: 5,
    title: 'The octopus',
    category: 'Nature',
    description:
      'Soft-bodied, eight-armed and endlessly inventive, octopuses can squeeze through any gap larger than their beak.',
    fact: 'They have three hearts and blue blood, coloured by a copper-based molecule called hemocyanin.',
    emoji: '🐙',
    hue: 145,
  },
  {
    id: 6,
    title: 'Bamboo',
    category: 'Nature',
    description:
      'One of the fastest-growing plants on Earth, bamboo is technically a grass rather than a tree.',
    fact: 'Some species can grow around 90 centimetres in a single day.',
    emoji: '🎋',
    hue: 128,
  },
  {
    id: 7,
    title: 'Tardigrades',
    category: 'Nature',
    description:
      'Also called water bears, these microscopic animals live everywhere from mountain moss to deep ocean sediment.',
    fact: 'In 2007 some tardigrades were exposed to open space on a European satellite mission, and many survived.',
    emoji: '🔬',
    hue: 158,
  },
  {
    id: 8,
    title: 'Monarch migration',
    category: 'Nature',
    description:
      'Each autumn, monarch butterflies in North America fly thousands of kilometres south to spend the winter in warmer forests.',
    fact: 'No single butterfly makes the full round trip; the cycle takes several generations to complete.',
    emoji: '🦋',
    hue: 112,
  },

  // History
  {
    id: 9,
    title: 'The Rosetta Stone',
    category: 'History',
    description:
      'Found in 1799 near the Egyptian town of Rashid, it carries one decree written in hieroglyphic, Demotic and Greek.',
    fact: 'Scholars could read the Greek and compare it with the Egyptian scripts, and Jean-François Champollion announced his breakthrough in deciphering hieroglyphs in 1822.',
    emoji: '🪨',
    hue: 30,
  },
  {
    id: 10,
    title: 'The Terracotta Army',
    category: 'History',
    description:
      'In 1974 farmers digging a well in China found thousands of life-sized clay soldiers guarding the tomb of the first emperor, Qin Shi Huang.',
    fact: 'Estimates put the number of soldiers at more than 8,000, alongside horses and chariots.',
    emoji: '🏺',
    hue: 22,
  },
  {
    id: 11,
    title: "Cleopatra's timeline",
    category: 'History',
    description:
      'Cleopatra, the last active ruler of Ptolemaic Egypt, lived in a world that was already ancient to her.',
    fact: 'She lived closer in time to the Moon landing than to the building of the Great Pyramid of Giza.',
    emoji: '⏳',
    hue: 42,
  },
  {
    id: 12,
    title: 'The Antikythera mechanism',
    category: 'History',
    description:
      'Recovered from a shipwreck off the Greek island of Antikythera in 1901, this corroded bronze device was an ancient astronomical calculator.',
    fact: 'Its gears modelled the movements of the Sun and Moon and could predict eclipses, sophistication not seen again for well over a thousand years.',
    emoji: '⚙️',
    hue: 36,
  },

  // Science
  {
    id: 13,
    title: 'Lightning',
    category: 'Science',
    description:
      'A giant electrical spark that jumps between clouds, or between a cloud and the ground, in a fraction of a second.',
    fact: 'The air around a bolt can briefly reach about 30,000 °C, several times hotter than the surface of the Sun.',
    emoji: '⚡',
    hue: 182,
  },
  {
    id: 14,
    title: 'Boiling and freezing at once',
    category: 'Science',
    description:
      'At one exact temperature and pressure, water can exist as ice, liquid and vapour all at the same time.',
    fact: 'This "triple point" is 0.01 °C at about 0.6% of normal atmospheric pressure, and it was once used to define the kelvin.',
    emoji: '🧊',
    hue: 192,
  },
  {
    id: 15,
    title: 'Radioactive bananas',
    category: 'Science',
    description:
      'Bananas are rich in potassium, and a tiny fraction of all natural potassium is radioactive.',
    fact: 'Scientists sometimes use the "banana equivalent dose" to show how small everyday radiation exposures really are.',
    emoji: '🍌',
    hue: 172,
  },
  {
    id: 16,
    title: 'Sound underwater',
    category: 'Science',
    description:
      'Sound is a vibration passing through matter, and it behaves very differently in water than in air.',
    fact: 'In water it travels at roughly 1,500 metres per second, about four times faster than in air.',
    emoji: '🌊',
    hue: 200,
  },

  // Technology
  {
    id: 17,
    title: 'The first computer bug',
    category: 'Technology',
    description:
      'In 1947 operators of the Harvard Mark II found a moth stuck in a relay and taped it into the logbook.',
    fact: 'Engineers were already calling technical faults "bugs" in the 1800s, so the moth was just a very literal example.',
    emoji: '🪲',
    hue: 214,
  },
  {
    id: 18,
    title: 'Apollo Guidance Computer',
    category: 'Technology',
    description:
      'The onboard computer that helped guide Apollo missions to the Moon ran on only a few kilobytes of erasable memory.',
    fact: 'Much of its software was stored in core rope memory, where wires were woven by hand through magnetic cores to encode the program.',
    emoji: '🚀',
    hue: 222,
  },
  {
    id: 19,
    title: 'The first website',
    category: 'Technology',
    description:
      'Tim Berners-Lee built the first web browser and server at CERN around 1990, and the site was opened to the public in 1991.',
    fact: 'In 1993 CERN made the underlying web software free for anyone to use, which helped the web spread worldwide.',
    emoji: '🌐',
    hue: 208,
  },
  {
    id: 20,
    title: 'GPS and relativity',
    category: 'Technology',
    description:
      'GPS satellites carry atomic clocks, and their signals are timed to billionths of a second.',
    fact: 'Relativity makes those clocks drift by about 38 microseconds a day, which would add up to kilometres of position error if it were not corrected.',
    emoji: '📡',
    hue: 218,
  },

  // Culture
  {
    id: 21,
    title: 'Kintsugi',
    category: 'Culture',
    description:
      'A Japanese repair technique that joins broken pottery with lacquer and dusts the seams with gold.',
    fact: 'The name means "golden joinery", and the approach treats damage as part of an object\'s history rather than something to hide.',
    emoji: '🍵',
    hue: 338,
  },
  {
    id: 22,
    title: 'The talking drum',
    category: 'Culture',
    description:
      'An hourglass-shaped drum from West Africa, played with a curved stick while the arm squeezes cords that tighten the drumheads.',
    fact: 'Because the pitch bends while it is played, skilled drummers can imitate the tones of speech, such as those of the Yoruba language.',
    emoji: '🥁',
    hue: 326,
  },
  {
    id: 23,
    title: 'Origami',
    category: 'Culture',
    description:
      'The Japanese art of folding paper into shapes, from simple cranes to sculptures with hundreds of folds.',
    fact: 'Paper folding can solve problems that are impossible with a compass and straightedge, such as trisecting an angle.',
    emoji: '📄',
    hue: 348,
  },
  {
    id: 24,
    title: 'The Hang',
    category: 'Culture',
    description:
      'A steel instrument shaped like two shallow bowls joined at the rim, played by tapping with the hands.',
    fact: 'It was created in Bern, Switzerland, in 2000, and its name is Bernese German for "hand".',
    emoji: '🔔',
    hue: 334,
  },
];

export default Object.freeze(items.map((item) => Object.freeze(item)));
