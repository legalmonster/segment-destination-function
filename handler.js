// URL: https://requestbin.com/r/en3mqhf9z3lmg/1Qho6EYQ8kt1IVl8kBUsxRJ5LjN

// This example uses verifies POST data with https://requestbin.com/
// Create a request bin and update this endpoint
const endpoint = "https://app.legalmonster.com/api/v1/consents/withdraw"
const document_public_key = "ohK9ZN7bSzkg1J1FArqykTBd"

/**
 * @param {SpecTrack} event The track event
 * @param {Object.<string, any>} settings Custom settings
 * @return void
 */
async function onTrack(event, settings) {
  var unsubscribe_events = ["Unsubscribed", "Email Unsubscribed"];

  if (unsubscribe_events.indexOf(event.event) >= 0) {
    const user_url = new URL(
      'https://app.legalmonster.com/api/v1/users/search'
      + '?query=' + event.email
    )

    const user_result = await fetch(user_url.toString(), {
      headers: new Headers({
        "x-api-key": Buffer.from(settings.apiKey),
        "Content-Type": "application/json",
      }),
      method: "get",
    })
    const user = await user_result.json()

    const url = new URL(
      endpoint
      + '?document_public_key=' + document_public_key
      + '&identifier=' + user[1]['user']['identifier']
    )

    const res = await fetch(url.toString(), {
      body: JSON.stringify(event),
      headers: new Headers({
        "x-api-key": Buffer.from(settings.apiKey),
        "Content-Type": "application/json",
      }),
      method: "post",
    })

    return await res.text() // or res.json() for JSON APIs
  }
}
