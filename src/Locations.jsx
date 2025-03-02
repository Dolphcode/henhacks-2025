class Location {
    constructor(build, highGround, lowGround, basement, openArea, soliditary) {
      this.building = build;
      this.highGround = highGround;
      this.lowGround = lowGround;
      this.basement = basement;
      this.openArea = openArea;
      this.soliditary = soliditary;
    }
  
    isHighGround() {
      return this.highGround;
    }
  
    isLowGround() {
      return this.lowGround;
    }

    isSoliditary() {
      return this.soliditary;
    }
  
    hasBasement() {
      return this.basement;
    }
  
    isOpenArea() {
      return this.openArea;
    }
    getBuilding(){
      return this.building;  
    }
  }
  const tallBuilding = new Location("tallBuilding",true, false, true, false, false);
  const hospital = new Location("hospital", true, false, true, false, false);
  const house = new Location('house', false, false, true, false, true);
  const park = new Location("park",false, false, false, true, true);
  const store = new Location("store",false, false, true, false, false);
  const lake = new Location("lake", false, true, false, true, true);
  const forest = new Location("forest", false, false, false, true, true);
  const office = new Location("office", true, false, true, false, false);
  const townHall = new Location("townHall", true, false, true, false, false);

  
  export { hospital, house, park, store, lake, forest, office, townHall, tallBuilding, Location };
  