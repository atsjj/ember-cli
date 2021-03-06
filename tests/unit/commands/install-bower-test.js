'use strict';

var expect              = require('chai').expect;
var MockProject         = require('../../helpers/mock-project');
var commandOptions      = require('../../factories/command-options');
var InstallBowerCommand = require('../../../lib/commands/install-bower');

describe('install:bower command', function() {
  var command;

  var msg =
      'This command has been removed. Please use `bower install ' +
      '<packageName> --save-dev --save-exact` instead.';

  beforeEach(function() {
    var project = new MockProject();

    project.isEmberCLIProject = function() {
      return true;
    };

    var options = commandOptions({
      project: project
    });

    command = new InstallBowerCommand(options);
  });

  it('throws a friendly silent error with args', function() {
    return command.validateAndRun(['moment', 'lodash']).then(function() {
      expect(false, 'should reject with error');
    }).catch(function(error) {
      expect(error.message).to.equal(
        msg, 'expect error to have a helpful message'
      );
    });
  });

  it('throws a friendly slient error without args', function() {
     return command.validateAndRun([]).then(function() {
      expect(false, 'should reject with error');
    }).catch(function(error) {
      expect(error.message).to.equal(
        msg, 'expect error to have a helpful message'
      );
    });
  });
});
