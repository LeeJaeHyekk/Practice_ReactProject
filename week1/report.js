class HttpError extends Error {
  constructor(response) {
    super(`${response.status} for ${response.url}`);
    this.name = "HttpError";
    this.response = response;
  }
}

async function loadJson(url) {
  const response = await fetch(url);
  if (response.status === 200) {
    return await response.json();
  } else {
    throw new HttpError(response);
  }
}

async function koreanMovie() {
  try {
    const res = await loadJson(
      `https://klassic-quote-api.mooo.com/v1/random-quote`
    );
    console.log(`${res.author}: ${res.quote}`);
    return res;
  } catch (err) {
    if (err instanceof HttpError && err.response.status === 404) {
      console.log("무언가 에러가 발생했군요!");
      return koreanMovie();
    } else {
      throw err;
    }
  }
}

koreanMovie();
