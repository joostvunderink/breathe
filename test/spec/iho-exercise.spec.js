describe('in out hold exercise', function() {
  describe('construction', function() {
    it('should have initialised status after creation', function() {
      // given, when
      var iho = new ihoExercise();

      // then
      var status = iho.getDisplayStatus();
      status.should.have.keys(['iteration', 'numIterations', 'finished', 'action', 'color', 'countdown', 'max', 'current']);
      status.action.should.equal('in');
    });
  });

  describe('settings', function() {
    it('should set the base time', function() {
      // given
      var iho = new ihoExercise();

      // when
      iho.setSetting('base', 7000);

      // then
      var settings = iho.getSettings();
      settings.base.should.equal(7000);
      var status = iho.getDisplayStatus();
      status.countdown.should.equal(8);
    });
  });

  describe('update', function() {
    it('should update the time since start', function() {
      // given
      var iho = new ihoExercise();

      // when
      iho.update(50);

      // then
      var status = iho.getStatus();
      status.step.should.equal(0);
      status.timeSinceStepStart.should.equal(50);
    });

    it('should update the display status', function() {
      // given
      var iho = new ihoExercise();

      // when
      iho.update(3000);

      // then
      var displayStatus = iho.getDisplayStatus();
      displayStatus.countdown.should.equal(3);
      displayStatus.action.should.equal('in');
    });

    it('should go to the next step', function() {
      // given
      var iho = new ihoExercise();

      // when
      iho.update(5025);

      // then
      var status = iho.getStatus();
      status.step.should.equal(1);
      status.timeSinceStepStart.should.equal(25);
    });

    it('should be able to skip a step', function() {
      // given
      var iho = new ihoExercise();

      // when
      iho.update(26000);

      // then
      var status = iho.getStatus();
      status.step.should.equal(2);
      status.timeSinceStepStart.should.equal(1000);
    });
  });


});

