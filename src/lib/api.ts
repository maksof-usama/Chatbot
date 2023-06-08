import { USER_KEY, session } from "~/lib/storage";

const baseApiURL = "https://app.medwiki.co.in/api/";


export function login(email: string) {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  return fetch(baseApiURL + "/visitor", {
    method: "POST",
    headers,
    body: JSON.stringify({
      "email": email
    })
  }).then(async r => {
    const json = await r.json()
    if (!r.ok) {
      throw { status: r.status, json };
    };
    return json
  })
}

export function verifyOtp({
  otp,
  email
}) {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  return fetch(baseApiURL + "/visitor/verify-otp", {
    method: "PATCH",
    headers,
    body: JSON.stringify({
      otp,
      email,
    }),
  }).then(async (r) => {
    const json = await r.json();
    if (!r.ok) {
      throw { status: r.status, json };
    }
    return json;
  });
}

export function askQuestion(question) {
  const user = session.get(USER_KEY)
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", `Bearer ${user?.session}`);
  return fetch(baseApiURL + `visitor/question`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      "question": question
    })
  })
    .then(async r => {
      const json = await r.json()
      if (!r.ok) {
        throw { status: r.status, json };
      };
      return json
    })
}

