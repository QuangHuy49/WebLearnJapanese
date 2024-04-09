import axios from 'axios';

// get hiragana alphabet by id lesson if type = 'alphabet_hiragana'
export async function getHiraganaJapaneseDataByIdLesson(id) {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/alphabet/hiragana-alphabet/${id}`);
        if (response.status === 200) {
            return response.data;
        } else {
            return null;
        } 
    } catch (error) {
        console.error('Failed to get hiragana alphabet data:', error);
        return null;
    }
}

// get hiragana alphabet by id lesson if type = 'dakuten_hiragana' and 'handakuten_hiragana'
export async function getDakutenAndHandakutenHiraganaJapaneseDataByIdLesson(id) {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/alphabet/dakuten-handakuten-hiragana-alphabet/${id}`);
        if (response.status === 200) {
            return response.data;
        } else {
            return null;
        } 
    } catch (error) {
        console.error('Failed to get dakuten and handakuten alphabet data:', error);
        return null;
    }
}

// get hiragana alphabet by id lesson if type = 'yoon_hiragana'
export async function getYoonHiraganaJapaneseDataByIdLesson(id) {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/alphabet/yoon-hiragana-alphabet/${id}`);
        if (response.status === 200) {
            return response.data;
        } else {
            return null;
        } 
    } catch (error) {
        console.error('Failed to get yoon alphabet data:', error);
        return null;
    }
}

// get katakana alphabet by id lesson if type = 'alphabet_katakana'
export async function getKatakanaJapaneseDataByIdLesson(id) {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/alphabet/katakana-alphabet/${id}`);
        if (response.status === 200) {
            return response.data;
        } else {
            return null;
        } 
    } catch (error) {
        console.error('Failed to get hiragana alphabet data:', error);
        return null;
    }
}

// get katakana alphabet by id lesson if type = 'dakuten_katakana' and 'handakuten_katakana'
export async function getDakutenAndHandakutenKatakanaJapaneseDataByIdLesson(id) {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/alphabet/dakuten-handakuten-katakana-alphabet/${id}`);
        if (response.status === 200) {
            return response.data;
        } else {
            return null;
        } 
    } catch (error) {
        console.error('Failed to get dakuten and handakuten alphabet data:', error);
        return null;
    }
}

// get katakana alphabet by id lesson if type = 'yoon_katakana'
export async function getYoonKatakanaJapaneseDataByIdLesson(id) {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/alphabet/yoon-katakana-alphabet/${id}`);
        if (response.status === 200) {
            return response.data;
        } else {
            return null;
        } 
    } catch (error) {
        console.error('Failed to get yoon alphabet data:', error);
        return null;
    }
}