package com.phone.bean;

public class HttpHeader {

	private String accept;
	
	private String acceptEncoding;
	
	private String acceptLanguage;
	
	private String cacheControl;
	
	private String connection;
	
	private String contentLength;
	
	private String contentType;
	
	private String cookie;
	
	private String host;
	
	private String origin;
	
	private String pragma;
	
	private String referer;
	
	private String userAgent;
	
	private String XRequestedWith;

	public String getAccept() {
		return accept;
	}

	public void setAccept(String accept) {
		this.accept = accept;
	}

	public String getAcceptEncoding() {
		return acceptEncoding;
	}

	public void setAcceptEncoding(String acceptEncoding) {
		this.acceptEncoding = acceptEncoding;
	}

	public String getAcceptLanguage() {
		return acceptLanguage;
	}

	public void setAcceptLanguage(String acceptLanguage) {
		this.acceptLanguage = acceptLanguage;
	}

	public String getCacheControl() {
		return cacheControl;
	}

	public void setCacheControl(String cacheControl) {
		this.cacheControl = cacheControl;
	}

	public String getConnection() {
		return connection;
	}

	public void setConnection(String connection) {
		this.connection = connection;
	}

	public String getContentLength() {
		return contentLength;
	}

	public void setContentLength(String contentLength) {
		this.contentLength = contentLength;
	}

	public String getContentType() {
		return contentType;
	}

	public void setContentType(String contentType) {
		this.contentType = contentType;
	}

	public String getCookie() {
		return cookie;
	}

	public void setCookie(String cookie) {
		this.cookie = cookie;
	}

	public String getHost() {
		return host;
	}

	public void setHost(String host) {
		this.host = host;
	}

	public String getOrigin() {
		return origin;
	}

	public void setOrigin(String origin) {
		this.origin = origin;
	}

	public String getPragma() {
		return pragma;
	}

	public void setPragma(String pragma) {
		this.pragma = pragma;
	}

	public String getReferer() {
		return referer;
	}

	public void setReferer(String referer) {
		this.referer = referer;
	}

	public String getUserAgent() {
		return userAgent;
	}

	public void setUserAgent(String userAgent) {
		this.userAgent = userAgent;
	}

	public String getXRequestedWith() {
		return XRequestedWith;
	}

	public void setXRequestedWith(String xRequestedWith) {
		XRequestedWith = xRequestedWith;
	}
	
	public static final HttpHeader getMeizuBasicHeader(){
		HttpHeader h = new HttpHeader();
		h.setAccept("application/json, text/javascript, */*; q=0.01");
		h.setAcceptEncoding("gzip,deflate");
		h.setAcceptLanguage("en,zh;q=0.8,ja;q=0.6,zh-CN;q=0.4,ko;q=0.2,zh-TW;q=0.2");
		h.setCacheControl("Cache-Control");
		h.setConnection("keep-alive");
		h.setContentLength("0");
		h.setContentType("application/x-www-form-urlencoded");
		h.setCookie("_uid=; _keyLogin=; _uticket=; _rmtk=; _islogin=; _ga=GA1.2.848099018.1409732414; Hm_lvt_2a0c04774115b182994cfcacf4c122e9=1416204924,1416274892,1416376035,1416448204; " +
				"Hm_lpvt_2a0c04774115b182994cfcacf4c122e9=1416473914; JSESSIONID=m61i5ozh8ow0ah212lwk9g6r9u2q");
		h.setHost("member.meizu.com");
		h.setOrigin("https://member.meizu.com");
		h.setPragma("no-cache");
		h.setReferer("https://member.meizu.com/sso?appuri=http://store.meizu.com/accounts/login.htm&useruri=http://store.meizu.com/&sid=&service=store&autodirct=true");
		h.setUserAgent("Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.111 Safari/537.36");
		h.setXRequestedWith("XMLHttpRequest");
		return h;
	}
}
