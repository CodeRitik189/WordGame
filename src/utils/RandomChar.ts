const RandomChar = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return characters[Math.floor(Math.random() * 26)];
  };
export default RandomChar;