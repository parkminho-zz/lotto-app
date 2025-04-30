export type Summary = {
    loginSuccess: number;
    loginFail: number;
    lottoClicks: number;
    pageVisits: number;
  };
  
  export type RecentLogs = {
    login: { userId: string; time: string }[];
    fail: { userId: string; time: string; reason: string }[];
  };
  