class Location {
    constructor(build, highGround, lowGround, basement, openArea) {
      this.building = build;
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
    getBuilding(){
      return this.building;  
    }
  }
  
  const tallBuilding = new Location("tallBuilding",true, false, true, false);
  const hospital = new Location("hospital", true, false, true, false);
  const house = new Location('house with sturdy basement', false, false, true, false);
  const park = new Location("park",false, false, false, true);
  const store = new Location("store",false, false, true, false);
  const lake = new Location("lake", false, true, false, true);
  const forest = new Location("forest", false, false, false, true);
  const office = new Location("office", true, false, true, false);
  const townHall = new Location("townHall", true, false, true, false);
  
  export { hospital, house, park, store, lake, forest, office, townHall, tallBuilding, Location };
  