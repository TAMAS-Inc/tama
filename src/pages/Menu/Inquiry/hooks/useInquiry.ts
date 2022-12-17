export interface Inquiry {
  email: string;
  title: string;
  content: string;
}

export const postInquiry = async (data: Inquiry) => {
  try {
    const END_POINT = 'http://localhost:3000/inquiry';
    const URL = `${END_POINT}/add`;

    const res = await fetch(URL, {
      method: 'POST',
      headers: {
        'content-type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify(data),
    });
    return res.json() as unknown;
  } catch {
    throw new Error('⛔️ 문의사항 전송에 실패하였습니다!');
  }
};
