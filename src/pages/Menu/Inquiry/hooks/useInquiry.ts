export interface Inquiry {
  email: string;
  title: string;
  content: string;
}

export const postInquiry = async (data: Inquiry) => {
  try {
    const url = `${import.meta.env.VITE_END_POINT}/inquiry/add`;

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return res.json() as unknown as Inquiry;
  } catch (e) {
    throw new Error('⛔️ 문의사항 전송에 실패하였습니다!');
  }
};
