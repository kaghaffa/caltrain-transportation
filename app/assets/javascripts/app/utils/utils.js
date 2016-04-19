define([], function() {
  return {

    convertSecondsToReadable: function test(seconds) {
      var hours = 0;
      var minutes = 0;

      if ((hours = Math.floor(seconds / 3600)) > 0) {
        seconds = seconds % 3600;
      }

      if ((minutes = Math.floor(seconds / 60)) > 0)  {
        seconds = seconds % 60;
      }

      var str = "";
      if (hours > 0) {
        if (hours == 1) {
          str += (hours + " hour ")
        } else {
          str += (hours + " hours ")
        }
      }

      if (minutes > 0) {
        if (minutes == 1) {
          str += minutes + " minute"
        } else {
          str += minutes + " minutes"
        }
      }

      return str;
    }

  }
});