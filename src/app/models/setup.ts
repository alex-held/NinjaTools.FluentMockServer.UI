export interface Setup {
  id: string;
  requestMatcher: RequestMatcher;
  responseAction: ResponseAction;
}

export interface RequestMatcher {
  path?: string;
  method?: string;
}

export interface ResponseAction {
  statusCode?: number;
}
