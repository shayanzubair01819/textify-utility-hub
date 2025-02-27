
// BigTextGenerator.tsx
// This utility component handles all the text transformations for the Big Text Converter tool

class BigTextGenerator {
  private static readonly normalChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
  // Bold text characters (Unicode Mathematical Bold)
  private static readonly boldChars = "𝐀𝐁𝐂𝐃𝐄𝐅𝐆𝐇𝐈𝐉𝐊𝐋𝐌𝐍𝐎𝐏𝐐𝐑𝐒𝐓𝐔𝐕𝐖𝐗𝐘𝐙𝐚𝐛𝐜𝐝𝐞𝐟𝐠𝐡𝐢𝐣𝐤𝐥𝐦𝐧𝐨𝐩𝐪𝐫𝐬𝐭𝐮𝐯𝐰𝐱𝐲𝐳𝟎𝟏𝟐𝟑𝟒𝟓𝟔𝟕𝟖𝟗";
  
  // Italic text characters (Unicode Mathematical Italic)
  private static readonly italicChars = "𝐴𝐵𝐶𝐷𝐸𝐹𝐺𝐻𝐼𝐽𝐾𝐿𝑀𝑁𝑂𝑃𝑄𝑅𝑆𝑇𝑈𝑉𝑊𝑋𝑌𝑍𝑎𝑏𝑐𝑑𝑒𝑓𝑔ℎ𝑖𝑗𝑘𝑙𝑚𝑛𝑜𝑝𝑞𝑟𝑠𝑡𝑢𝑣𝑤𝑥𝑦𝑧0123456789";
  
  // Bold-Italic text characters (Unicode Mathematical Bold Italic)
  private static readonly boldItalicChars = "𝑨𝑩𝑪𝑫𝑬𝑭𝑮𝑯𝑰𝑱𝑲𝑳𝑴𝑵𝑶𝑷𝑸𝑹𝑺𝑻𝑼𝑽𝑾𝑿𝒀𝒁𝒂𝒃𝒄𝒅𝒆𝒇𝒈𝒉𝒊𝒋𝒌𝒍𝒎𝒏𝒐𝒑𝒒𝒓𝒔𝒕𝒖𝒗𝒘𝒙𝒚𝒛0123456789";
  
  // Bubble text characters (Unicode Enclosed Alphanumerics)
  private static readonly bubbleChars = "ⒶⒷⒸⒹⒺⒻⒼⒽⒾⒿⓀⓁⓂⓃⓄⓅⓆⓇⓈⓉⓊⓋⓌⓍⓎⓏⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩ⓪①②③④⑤⑥⑦⑧⑨";
  
  // Circle text characters (Unicode Circled Alphanumerics)
  private static readonly circleChars = "ⒶⒷⒸⒹⒺⒻⒼⒽⒾⒿⓀⓁⓂⓃⓄⓅⓆⓇⓈⓉⓊⓋⓌⓍⓎⓏⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩ⓪①②③④⑤⑥⑦⑧⑨";
  
  // Square text characters (Unicode Squared Alphanumerics)
  private static readonly squareChars = "🄰🄱🄲🄳🄴🄵🄶🄷🄸🄹🄺🄻🄼🄽🄾🄿🅀🅁🅂🅃🅄🅅🅆🅇🅈🅉🄰🄱🄲🄳🄴🄵🄶🄷🄸🄹🄺🄻🄼🄽🄾🄿🅀🅁🅂🅃🅄🅅🅆🅇🅈🅉0123456789";
  
  // Box text characters (Unicode Boxed Alphanumerics)
  private static readonly boxChars = "🄰🄱🄲🄳🄴🄵🄶🄷🄸🄹🄺🄻🄼🄽🄾🄿🅀🅁🅂🅃🅄🅅🅆🅇🅈🅉🄰🄱🄲🄳🄴🄵🄶🄷🄸🄹🄺🄻🄼🄽🄾🄿🅀🅁🅂🅃🅄🅅🅆🅇🅈🅉0123456789";

  // Emoji-based characters (just a sample, this could be expanded)
  private static readonly emojiChars: { [key: string]: string } = {
    'a': '🅰', 'b': '🅱', 'c': '🅲', 'd': '🅳', 'e': '🅴', 'f': '🅵', 'g': '🅶', 'h': '🅷',
    'i': '🅸', 'j': '🅹', 'k': '🅺', 'l': '🅻', 'm': '🅼', 'n': '🅽', 'o': '🅾', 'p': '🅿',
    'q': '🆀', 'r': '🆁', 's': '🆂', 't': '🆃', 'u': '🆄', 'v': '🆅', 'w': '🆆', 'x': '🆇',
    'y': '🆈', 'z': '🆉', '!': '❗', '?': '❓', '0': '0️⃣', '1': '1️⃣', '2': '2️⃣', 
    '3': '3️⃣', '4': '4️⃣', '5': '5️⃣', '6': '6️⃣', '7': '7️⃣', '8': '8️⃣', '9': '9️⃣'
  };

  // Flip characters (for horizontal flip)
  private static readonly flipChars: { [key: string]: string } = {
    'a': 'ɐ', 'b': 'q', 'c': 'ɔ', 'd': 'p', 'e': 'ǝ', 'f': 'ɟ', 'g': 'ƃ', 'h': 'ɥ',
    'i': 'ᴉ', 'j': 'ɾ', 'k': 'ʞ', 'l': 'l', 'm': 'ɯ', 'n': 'u', 'o': 'o', 'p': 'd',
    'q': 'b', 'r': 'ɹ', 's': 's', 't': 'ʇ', 'u': 'n', 'v': 'ʌ', 'w': 'ʍ', 'x': 'x',
    'y': 'ʎ', 'z': 'z', 'A': '∀', 'B': 'q', 'C': 'Ɔ', 'D': 'p', 'E': 'Ǝ', 'F': 'Ⅎ',
    'G': 'פ', 'H': 'H', 'I': 'I', 'J': 'ſ', 'K': 'ʞ', 'L': '˥', 'M': 'W', 'N': 'N',
    'O': 'O', 'P': 'Ԁ', 'Q': 'Q', 'R': 'ᴚ', 'S': 'S', 'T': '┴', 'U': '∩', 'V': 'Λ',
    'W': 'M', 'X': 'X', 'Y': '⅄', 'Z': 'Z', '0': '0', '1': 'Ɩ', '2': 'ᄅ', '3': 'Ɛ',
    '4': 'ㄣ', '5': 'ϛ', '6': '9', '7': 'ㄥ', '8': '8', '9': '6', '.': '˙', ',': '\'',
    '\'': ',', '"': ',,', '`': ',', '?': '¿', '!': '¡', '(': ')', ')': '(', '[': ']',
    ']': '[', '{': '}', '}': '{', '<': '>', '>': '<', '&': '⅋', '_': '‾'
  };

  // Helper method for character mapping
  private static mapChars(text: string, sourceChars: string, targetChars: string): string {
    return text.split('').map(char => {
      const index = sourceChars.indexOf(char);
      return index !== -1 ? targetChars[index] : char;
    }).join('');
  }

  // Transform to bold text
  public static toBold(text: string): string {
    return this.mapChars(text, this.normalChars, this.boldChars);
  }

  // Transform to italic text
  public static toItalic(text: string): string {
    return this.mapChars(text, this.normalChars, this.italicChars);
  }

  // Transform to bold-italic text
  public static toBoldItalic(text: string): string {
    return this.mapChars(text, this.normalChars, this.boldItalicChars);
  }

  // Transform to bubble text
  public static toBubble(text: string): string {
    return this.mapChars(text, this.normalChars, this.bubbleChars);
  }

  // Transform to circled text
  public static toCircle(text: string): string {
    return this.mapChars(text, this.normalChars, this.circleChars);
  }

  // Transform to squared text
  public static toSquare(text: string): string {
    return this.mapChars(text, this.normalChars, this.squareChars);
  }

  // Transform to boxed text
  public static toBox(text: string): string {
    return this.mapChars(text, this.normalChars, this.boxChars);
  }

  // Transform to wide text
  public static toWide(text: string, intensity: number = 50): string {
    const spaces = ' '.repeat(Math.max(1, Math.floor(intensity / 10)));
    return text.split('').join(spaces);
  }

  // Transform to strikethrough text
  public static toStrikethrough(text: string): string {
    return text.split('').map(char => char + '\u0336').join('');
  }

  // Transform to underlined text
  public static toUnderline(text: string): string {
    return text.split('').map(char => char + '\u0332').join('');
  }

  // Transform to horizontally flipped text
  public static flipHorizontal(text: string): string {
    return text.split('').map(char => this.flipChars[char] || char).reverse().join('');
  }

  // Transform to vertically flipped text (upside down)
  public static flipVertical(text: string): string {
    return this.flipHorizontal(text); // In most cases, this is similar to horizontal flip + reverse
  }

  // Transform to Zalgo text (glitchy text with diacritics)
  public static toZalgo(text: string, intensity: number = 50): string {
    // Zalgo marks (combining diacritical marks)
    const zalgoMarks = [
      '\u030d', '\u030e', '\u0304', '\u0305', '\u033f', '\u0311', '\u0306', '\u0310',
      '\u0352', '\u0357', '\u0351', '\u0307', '\u0308', '\u030a', '\u0342', '\u0343',
      '\u0344', '\u034a', '\u034b', '\u034c', '\u0303', '\u0302', '\u030c', '\u0350',
      '\u0300', '\u0301', '\u030b', '\u030f', '\u0312', '\u0313', '\u0314', '\u033d',
      '\u0309', '\u0363', '\u0364', '\u0365', '\u0366', '\u0367', '\u0368', '\u0369',
      '\u036a', '\u036b', '\u036c', '\u036d', '\u036e', '\u036f', '\u033e', '\u035b'
    ];

    // Calculate number of marks to add based on intensity
    const markCount = Math.floor((intensity / 100) * 15) + 1;

    return text.split('').map(char => {
      let zalgoChar = char;
      
      // Add random zalgo marks based on intensity
      for (let i = 0; i < markCount; i++) {
        const markIndex = Math.floor(Math.random() * zalgoMarks.length);
        zalgoChar += zalgoMarks[markIndex];
      }
      
      return zalgoChar;
    }).join('');
  }

  // Transform to slanted/slashed text
  public static toSlanted(text: string): string {
    // Using combining long stroke overlay
    return text.split('').map(char => char + '\u0336').join('');
  }

  // Transform to emoji-based text
  public static toEmoji(text: string): string {
    return text.toLowerCase().split('').map(char => this.emojiChars[char] || char).join('');
  }
}

export default BigTextGenerator;
