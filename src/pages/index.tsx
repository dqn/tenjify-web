import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import { tenjify } from "../helpers/tenjify";

const HomePage: React.FC = () => {
  const [text, setText] = useState("");
  const [imageSrc, setImageSrc] = useState("");
  const [width, setWidth] = useState(30);
  const [threshold, setThreshold] = useState(128);
  const [reverse, setReverse] = useState(false);

  const handleChangeFile = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.item(0);

      if (!file) {
        setImageSrc("");
        setText("");

        return;
      }

      const canvas = document.createElement("canvas");
      const ctx = canvas?.getContext("2d");

      if (!ctx) {
        return;
      }

      const reader = new FileReader();

      reader.onload = (e) => {
        const src = e.target?.result;

        if (typeof src === "string") {
          setImageSrc(src);
        }
      };

      reader.readAsDataURL(file);
    },
    [setText, setImageSrc],
  );

  const handleChangeThreshold = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setThreshold(Number(event.target.value));
    },
    [setThreshold],
  );

  const handleChangeWidth = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setWidth(Number(event.target.value));
    },
    [setWidth],
  );

  const handleChangeReverse = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setReverse(event.target.checked);
    },
    [setReverse],
  );

  const handleClickCopy = useCallback(() => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
    }
  }, [text]);

  useEffect(() => {
    if (imageSrc) {
      tenjify(imageSrc, { width, threshold, reverse }).then(setText);
    }
  }, [imageSrc, width, threshold, reverse, setText]);

  return (
    <main className="max-w-2xl mx-auto px-2 py-5">
      <h1 className="text-3xl font-bold">tenjify-web</h1>
      <div className="py-3">
        <input
          type="file"
          accept="image/*"
          onChange={handleChangeFile}
          className="w-full border"
        />
      </div>
      <div className="py-2">
        <label className="font-bold">Width: {width}</label>
        <input
          type="range"
          value={width}
          max={60}
          onChange={handleChangeWidth}
          className="w-full"
          disabled={!imageSrc}
        />

        <label className="font-bold">Threshold: {threshold}</label>
        <input
          type="range"
          value={threshold}
          max={255}
          onChange={handleChangeThreshold}
          className="w-full"
          disabled={!imageSrc}
        />

        <label className="font-bold">Reverse: </label>
        <input
          type="checkbox"
          checked={reverse}
          onChange={handleChangeReverse}
          disabled={!imageSrc}
        />

        <div className="pt-4">
          <button
            onClick={handleClickCopy}
            className="bg-gray-800 text-white rounded p-1 w-full disabled:opacity-50"
            disabled={!text}
          >
            Copy to clipboard
          </button>
        </div>
      </div>

      <div className="leading-5">
        <div className="whitespace-pre-wrap">{text}</div>
      </div>
    </main>
  );
};

export default HomePage;
