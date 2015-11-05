@focus
Feature: One-liner description of this

  # The background will be run for every scenario
#  Background:

  Scenario: Creating anonymous account for first user works
    Given I am a new user
    When Alice goes to "/"
    And Alice should not be logged in
    Then Alice goes to "/focus"
    And Alice should be logged in
    And Alice should see her name in task window

  Scenario: Creating anonymous account for second user works
    When Bob goes to "/focus"
    Then Alice should see her name in task window
    And Bob should see her name in task window


  Scenario: Tasks are shared among the team
    When Alice adds a task
    Then Alice should see the task as todo
    And Bob should see the task as todo

  Scenario: One user starts and waits
    When Bob adds a task
    And Bob clicks start
    Then Bob should not see the pomodoro timer

  Scenario: Both users clicked start
    And Alice clicks start
    Then Bob should see the pomodoro timer
    And Alice should see the pomodoro timer
    And Bob should have the pomodoro timer decreasing from "25" minutes


