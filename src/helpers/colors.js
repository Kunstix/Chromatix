import chroma from 'chroma-js';

const levels = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

const generatePalette = basePalette => {
  const fullPalette = {
    paletteName: basePalette.paletteName,
    id: basePalette.id,
    emoji: basePalette.emoji,
    colors: {
      50: []
    }
  };
  levels.forEach(level => (fullPalette.colors[level] = []));
  basePalette.colors.forEach(color =>
    generateScale(color.color, 10)
      .reverse()
      .forEach((scaleColor, index) =>
        fullPalette.colors[levels[index]].push({
          name: `${color.name} ${levels[index]}`,
          id: color.name.toLowerCase().replace(/ /g, '-'),
          hex: scaleColor,
          rgb: chroma(scaleColor).css(),
          rgba: chroma(scaleColor)
            .css()
            .replace('rgb', 'rgba')
            .replace(')', ',1.0')
        })
      )
  );
  return fullPalette;
};

const getRange = hexColor => {
  const startColor = chroma(hexColor).darken(1.4).hex();
  const endColor = '#fff';
  return [startColor, hexColor, endColor];
};

const generateScale = (hexColor, numberOfColors) => {
  return chroma.scale(getRange(hexColor)).mode('lab').colors(numberOfColors);
};

export { generatePalette };
