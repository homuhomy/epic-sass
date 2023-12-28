import React, { useState } from "react";
import Image from "next/image";
import tiger from "../../public/assets/tiger.png";
import lion from "../../public/assets/lion.png";
import Link from "next/link";

export default function CharacterSelector() {
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  const handleCharacterSelect = (character) => {
    setSelectedCharacter(character);
  };

  // const handleSave = () => {
  //   console.log("Selected character:", selectedCharacter);
  //   // Here you would typically handle the save, e.g., update user settings.
  // };

  return (
    <div className="bg-blue">
      <div className="container mx-auto text-center p-4">
        <div className="tablet-centered">
          <h1 className="text-2xl mb-4">
            Choose your character! <br />
            <i>Pilih karakter anda!</i>
          </h1>
          <div className="flex justify-center gap-4 mb-4">
            <div
              className={`border-2 cursor-pointer ${
                selectedCharacter === "tiger"
                  ? "border-blue-500"
                  : "border-transparent"
              }`}
              onClick={() => handleCharacterSelect("tiger")}
            >
              <div className="w-32 h-32 max-w-xs max-h-xs">
                <Image src={tiger} alt="Tiger" layout="responsive" width={240} height={240} />
              </div>
            </div>
            <div
              className={`border-2 cursor-pointer ${
                selectedCharacter === "lion"
                  ? "border-blue-500"
                  : "border-transparent"
              }`}
              onClick={() => handleCharacterSelect("lion")}
            >
              <div className="w-32 h-32 max-w-xs max-h-xs">
                <Image src={lion} alt="Lion" layout="responsive" width={240} height={240} />
              </div>
            </div>
          </div>
          <Link href="/">
            <div className="pill bg-white large-button-text">Save</div>
          </Link>
        </div>
      </div>
    </div>
  );
}
