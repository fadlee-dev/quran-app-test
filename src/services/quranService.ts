// API endpoints for alquran.cloud
const API_BASE_URL = "https://api.alquran.cloud/v1";

export interface Surah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
}

export interface Ayah {
  number: number;
  text: string;
  numberInSurah: number;
  juz: number;
  manzil: number;
  page: number;
  ruku: number;
  hizbQuarter: number;
  sajda: boolean | { recommended: boolean; obligatory: boolean };
}

export interface SurahDetail {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  revelationType: string;
  numberOfAyahs: number;
  ayahs: Ayah[];
}

export interface QuranResponse<T> {
  code: number;
  status: string;
  data: T;
}

// Get all surahs
export const getAllSurahs = async (): Promise<Surah[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/surah`);
    const data: QuranResponse<Surah[]> = await response.json();

    if (data.code !== 200) {
      throw new Error(`API Error: ${data.status}`);
    }

    return data.data;
  } catch (error) {
    console.error("Error fetching surahs:", error);
    throw error;
  }
};

// Get a specific surah with Arabic text
export const getSurahArabic = async (
  surahNumber: number,
): Promise<SurahDetail> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/surah/${surahNumber}/quran-uthmani`,
    );
    const data: QuranResponse<SurahDetail> = await response.json();

    if (data.code !== 200) {
      throw new Error(`API Error: ${data.status}`);
    }

    return data.data;
  } catch (error) {
    console.error(`Error fetching surah ${surahNumber}:`, error);
    throw error;
  }
};

// Get a specific surah with translation
export const getSurahTranslation = async (
  surahNumber: number,
  edition: string = "en.asad",
): Promise<SurahDetail> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/surah/${surahNumber}/${edition}`,
    );
    const data: QuranResponse<SurahDetail> = await response.json();

    if (data.code !== 200) {
      throw new Error(`API Error: ${data.status}`);
    }

    return data.data;
  } catch (error) {
    console.error(`Error fetching surah ${surahNumber} translation:`, error);
    throw error;
  }
};

// Get both Arabic and translation and combine them
export const getSurahWithTranslation = async (
  surahNumber: number,
  translationEdition: string = "en.asad",
): Promise<{
  surah: SurahDetail;
  combinedAyahs: Array<{
    number: number;
    text: string;
    translation: string;
    juz: number;
    page: number;
  }>;
}> => {
  try {
    const [arabicSurah, translationSurah] = await Promise.all([
      getSurahArabic(surahNumber),
      getSurahTranslation(surahNumber, translationEdition),
    ]);

    // Combine the Arabic text with the translation
    const combinedAyahs = arabicSurah.ayahs.map((ayah, index) => ({
      number: ayah.numberInSurah,
      text: ayah.text,
      translation: translationSurah.ayahs[index].text,
      juz: ayah.juz,
      page: ayah.page,
    }));

    return {
      surah: arabicSurah,
      combinedAyahs,
    };
  } catch (error) {
    console.error(
      `Error fetching surah ${surahNumber} with translation:`,
      error,
    );
    throw error;
  }
};
