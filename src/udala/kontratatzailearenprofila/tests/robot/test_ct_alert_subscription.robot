# ============================================================================
# DEXTERITY ROBOT TESTS
# ============================================================================
#
# Run this robot test stand-alone:
#
#  $ bin/test -s udala.kontratatzailearenprofila -t test_alert_subscription.robot --all
#
# Run this robot test with robot server (which is faster):
#
# 1) Start robot server:
#
# $ bin/robot-server --reload-path src udala.kontratatzailearenprofila.testing.UDALA_KONTRATATZAILEARENPROFILA_ACCEPTANCE_TESTING
#
# 2) Run robot tests:
#
# $ bin/robot /src/udala/kontratatzailearenprofila/tests/robot/test_alert_subscription.robot
#
# See the http://docs.plone.org for further details (search for robot
# framework).
#
# ============================================================================

*** Settings *****************************************************************

Resource  plone/app/robotframework/selenium.robot
Resource  plone/app/robotframework/keywords.robot

Library  Remote  ${PLONE_URL}/RobotRemote

Test Setup  Open test browser
Test Teardown  Close all browsers


*** Test Cases ***************************************************************

Scenario: As a site administrator I can add a AlertSubscription
  Given a logged-in site administrator
    and an add AlertSubscription form
   When I type 'My AlertSubscription' into the title field
    and I submit the form
   Then a AlertSubscription with the title 'My AlertSubscription' has been created

Scenario: As a site administrator I can view a AlertSubscription
  Given a logged-in site administrator
    and a AlertSubscription 'My AlertSubscription'
   When I go to the AlertSubscription view
   Then I can see the AlertSubscription title 'My AlertSubscription'


*** Keywords *****************************************************************

# --- Given ------------------------------------------------------------------

a logged-in site administrator
  Enable autologin as  Site Administrator

an add AlertSubscription form
  Go To  ${PLONE_URL}/++add++AlertSubscription

a AlertSubscription 'My AlertSubscription'
  Create content  type=AlertSubscription  id=my-alert_subscription  title=My AlertSubscription

# --- WHEN -------------------------------------------------------------------

I type '${title}' into the title field
  Input Text  name=form.widgets.IBasic.title  ${title}

I submit the form
  Click Button  Save

I go to the AlertSubscription view
  Go To  ${PLONE_URL}/my-alert_subscription
  Wait until page contains  Site Map


# --- THEN -------------------------------------------------------------------

a AlertSubscription with the title '${title}' has been created
  Wait until page contains  Site Map
  Page should contain  ${title}
  Page should contain  Item created

I can see the AlertSubscription title '${title}'
  Wait until page contains  Site Map
  Page should contain  ${title}
