type Props = {
  url?: string;
  timeout?: number;
  redirect?: boolean;
};

function Loading({ url, timeout = 600, redirect }: Props) {
  const redirectURL = url || `/panel/?to=${window.location.pathname}`;
  const doRedirect = redirect || false;

  /**
   * Do we want redirect with waiting
   */
  if (doRedirect) {
    setTimeout(() => {
      window.location.href = redirectURL;
    }, timeout);
  }

  return <main>Loading ...</main>;
}

export default Loading;
