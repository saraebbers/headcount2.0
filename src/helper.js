export default class DistrictRepository {
  constructor(stats) {
    this.stats = this.cleanStats(stats);
  }

  cleanStats = (stats) => stats.reduce((allStats, stat) => {
    const upperCaseStat = stat.Location.toUpperCase();
    const roundedData = Math.round(1000 * stat.Data) / 1000 || 0;

    if(allStats[upperCaseStat]) {
      allStats[upperCaseStat][stat.TimeFrame] = roundedData
    } else {
    allStats[upperCaseStat] = {[stat.TimeFrame]: roundedData};
  }
    return allStats;
  }, {});

  findByName = (name) => {

    if (name && Object.keys(this.stats).includes(name.toUpperCase())) {
      const upperCaseName = name.toUpperCase();
      return {location: upperCaseName, stats: this.stats[upperCaseName]};
    } else {
      return undefined
    }
  }

  findAverage = (district) => {
    if (!district) {
      console.log('error, no district entered');
    } else {
      let districtName = {};
      let ucDistrict = district.toUpperCase();
      
      if (Object.keys(this.stats).includes(ucDistrict)) {
        districtName = {location: ucDistrict, stats: this.stats[ucDistrict]};
        let total = 0;
        let i;
        let lengthObj = Object.values(districtName.stats).length;
        for (i=0; i < lengthObj; i++) {
          total = total + Object.values(districtName.stats)[i];
        }
        const average = (total/lengthObj);
        const roundedAverage = Math.round(1000 * average) / 1000;
        return roundedAverage
        }
    }
  }

  compareDistrictAverages = (comparison1, comparison2) => {
    const ucComparison1 = comparison1.toUpperCase();
    const ucComparison2 = comparison2.toUpperCase();
    const ave1 = this.findAverage(ucComparison1);
    const ave2 = this.findAverage(ucComparison2);
    const comparison = ave1/ave2;
    const roundedComparison = Math.round(1000 * comparison) / 1000;
    return {[ucComparison1]: ave1, [ucComparison2]: ave2, compared: roundedComparison}
  }

  findAllMatches = (searchName) => {
      if (searchName) {
        const ucSearchName = searchName.toUpperCase()
        const matching = Object.keys(this.stats).filter(stat => {
          return stat.includes(ucSearchName)
        })
        return matching.map(stat => {
           return {location: stat, stats: this.stats[stat]} 
         })
      } else if (!searchName) {
          return Object.keys(this.stats).map(stat => {
           return {location: stat, stats: this.stats[stat]} 
         })
      } else {
          return [];
      }
    }
}

