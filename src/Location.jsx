class Location {
    constructor(highGround = false, lowGround = false, basement = false, openArea = false) {
      this.highGround = highGround;
      this.lowGround = lowGround;
      this.basement = basement;
      this.openArea = openArea;
    }
  
    isHighGround() {
      return this.highGround;
    }
  
    isLowGround() {
      return this.lowGround;
    }
  
    hasBasement() {
      return this.basement;
    }
  
    isOpenArea() {
      return this.openArea;
    }
  }
  
export const tallBuilding = new Location(true, false, true, false);
export const hospital = new Location(true, false, true, false);
export const house = new Location(false, false, true, false);
export const park = new Location(false, false, false, true);
export const store = new Location(false, false, true, false);
export const lake = new Location(false, true, false, true);
export const forest = new Location(false, false, false, true);
export const office = new Location(true, false, true, false);
export const townHall = new Location(true, false, true, false);

export {Location};