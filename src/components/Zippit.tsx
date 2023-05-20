import getZippitApi from "@/api";
import { trackShortenUrl } from "@/googleanalytics";
import { FormEventHandler, useState } from "react";
import CopyClipboard from "./CopyClipboard";
import UrlIcon from "./UrlIcon";

const api = getZippitApi();

const Zippit = () => {
  const [url, setUrl] = useState("");
  const [shortening, setShortening] = useState(false);
  const [identifier, setIdentifier] = useState<string | undefined>();
  const [error, setError] = useState<any>();
  const [copied, setCopied] = useState(false);

  const shorten = async () => {
    setShortening(true);
    setIdentifier(undefined);
    setError(undefined);
    setCopied(false);

    try {
      const identifer = await api.shorten(url);
      setIdentifier(identifer);
      setUrl("");
    } catch (err) {
      setError(err);
    } finally {
      setShortening(false);
      trackShortenUrl(url);
    }
  };

  const handleSubmit: FormEventHandler = (evt) => {
    evt.preventDefault();
    shorten();
  };

  const copyToClipboard = () => {
    window.navigator.clipboard.writeText(`https://zippit.io/${identifier}`);
    setCopied(true);
  };

  return (
    <div className="zippit">
      <form className="input-wrapper" onSubmit={handleSubmit}>
        <UrlIcon />
        <input
          type="url"
          placeholder="https://"
          className="input"
          required={true}
          value={url}
          onChange={(evt) => setUrl(evt.target.value)}
          autoComplete="false"
          disabled={shortening}
        />
        <button className="shorten" type="submit" disabled={shortening}>
          zippit
        </button>
      </form>

      <div className="zippit-result">
        {shortening && <p>shortening ...</p>}
        {identifier && (
          <div className="flex items-center justify-center">
            <a href={`/${identifier}`} className="hover:underline" target="_blank">
              https://zippit.io/{identifier}
            </a>
            {copied ? (
              <span className="text-gray-300 text-xs px-4 underline" title="Link copied">
                copied !
              </span>
            ) : (
              <button title="Copy to clipboard" onClick={copyToClipboard}>
                <CopyClipboard />
              </button>
            )}
          </div>
        )}
        {error && <p className="text-red-600">Something went wrong, please try later !</p>}
      </div>
    </div>
  );
};

export default Zippit;
