verbose = false

const convert = (s, mode) =>
  [
    [/अ/g, "a"],
    [/इ|\u093F/g, "i"],
    [/ऋ|\u0943/g, "r"],
    [/ऌ|\u0962/g, "l"],
    [/उ|\u0941/g, "u"],

    [/आ|\u093E/g, ["ā", "A", "aa"]],
    [/ई|\u0940/g, ["ī", "I", "ii"]],
    [/ॠ|\u0943/g, ["r̄", "R", "rr"]],
    [/ॡ|\u0963/g, ["l̄", "L", "ll"]],
    [/ऊ|\u0942/g, ["ū", "U", "uu"]],

    [/ए|\u0947/g, "e"],
    [/ओ|\u094B/g, "o"],

    [/ऐ|\u0948/g, ["aı", "E", "ai"]],
    [/औ|\u094C/g, ["au", "O", "au"]],

    [/(?<=[कचटतपखछठथफगजडदबघझढधभङञणनमशषसहयरलव])(?![\u094DiīIeēEaāAoōOuūUr̄Rl̄L])/g, "a"],

    [/क/g, "c"],
    [/च/g, ["c\u0307", "C", "cz"]],
    [/ट/g, ["t\u0307", "T", "tz"]],
    [/त/g, "t"],
    [/प/g, "p"],

    [/ख/g, ["c\u0315", "ch", "ch"]],
    [/छ/g, ["c\u0307\u0315", "Ch", "czh"]],
    [/ठ/g, ["t\u0307\u0315", "Th", "tzh"]],
    [/थ/g, ["t\u0315", "th", "th"]],
    [/फ/g, ["p\u0315", "ph", "ph"]],

    [/ग/g, "g"],
    [/ज/g, ["g\u0307", "G", "gz"]],
    [/ड/g, ["d\u0307", "D", "dz"]],
    [/द/g, "d"],
    [/ब/g, "b"],

    [/घ/g, ["g\u0315", "gh", "gh"]],
    [/झ/g, ["g\u0307\u0315", "Gh", "gzh"]],
    [/ढ/g, ["d\u0307\u0315", "Dh", "dzh"]],
    [/ध/g, ["d\u0315", "dh", "dh"]],
    [/भ/g, ["b\u0315", "bh", "bh"]],

    [/ङ/g, verbose ? ["ŋ", "k", "k"] : "n"],
    [/ञ/g, verbose ? ["ŋ\u0307", "K", "kz"] : "n"],
    [/ण/g, ["n\u0307", "N", "nz"]],
    [/न/g, "n"],
    [/म/g, "m"],
    [/\u0902/g, "q"], // anusvaara ं

    [/\u0903/g, "x"], // visarga ः
    [/श/g, ["x\u0307", "X", "xz"]],
    [/ष/g, ["s\u0307", "S", "sz"]],
    [/स/g, "s"],

    [/ह/g, "h"],
    [/य/g, "j"],
    [/र/g, "y"],
    [/ल/g, "w"],
    [/व/g, "v"],

    [/ऽ/g, "-"],

    [/०/g, "0"],
    [/१/g, "1"],
    [/२/g, "2"],
    [/३/g, "3"],
    [/४/g, "4"],
    [/५/g, "5"],
    [/६/g, "6"],
    [/७/g, "7"],
    [/८/g, "8"],
    [/९/g, "9"],

    [/\u094D/g, ""],

    [/y/g, mode === 0 ? "r\u0306" : "y"],
    [/w/g, mode === 0 ? "l\u0306" : "w"],
    [/(?<=[iīIeēEaāAoōOuūUr̄Rl̄L][rl])\u0306(?=[iīIeēEaāAoōOuūUr̄Rl̄L])/g, ""],
    [/(?<![a-zA-Zīēāōūr̄l̄\u0306\u0307\u0315][rl])\u0306(?=[iīIeēEaāAoōOuūUr̄Rl̄L])/g, ""],

    [/i/g, mode === 0 ? "ı" : "i"],
    [/j/g, mode === 0 ? "ȷ" : "j"],

    [/\u0930/g, "\u0307"], // nuktaa ़
    [/।/g, ","],
    [/॥/g, "."],
    [/॰/g, "'"],

  ]
  .map(([x, y]) =>
    [x, (Array.isArray(y) ? y : [y, y, y])[mode]]
  )
  .reduce((acc, [x, y]) => acc.replace(x, y), s.normalize("NFD"))
  .normalize("NFC")
