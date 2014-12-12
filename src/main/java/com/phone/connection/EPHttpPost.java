package com.phone.connection;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.apache.http.Consts;
import org.apache.http.Header;
import org.apache.http.HttpEntity;
import org.apache.http.NameValuePair;
import org.apache.http.ParseException;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.protocol.HttpClientContext;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.util.EntityUtils;
import org.apache.log4j.Logger;

import com.phone.bean.HttpHeader;
import com.phone.bean.User;

public class EPHttpPost {

	private static final Logger log = Logger.getLogger(EPHttpGet.class);
	private ConnectionCallBack callback;
	private HttpPost httpPost;
	private HttpClientContext context;
	private CloseableHttpClient client ;
	private boolean isReConnection = true;
	
	
	public EPHttpPost(String url, ConnectionCallBack callback, User u, List<NameValuePair> formparams, Map<String, String> headMap) {
		System.out.println("HTTP POST URL : " + url);
		this.callback = callback;
		this.httpPost = new HttpPost(url);
		RequestConfig requestConfig = RequestConfig.custom().setSocketTimeout(ConnectionConstant.SOCKET_TIMEOUT).
				setConnectTimeout(ConnectionConstant.CONNECT_TIMEOUT).build();
		httpPost.setConfig(requestConfig);
		Set<String> set = headMap.keySet();
		for (String key : set) {
			httpPost.setHeader(key, headMap.get(key));
		}
		UrlEncodedFormEntity entity = new UrlEncodedFormEntity(formparams, Consts.UTF_8);
		httpPost.setEntity(entity);
		this.context = u.getContext();
		this.client = u.getClient();
		/*if(this.context != null && this.context.getCookieStore() != null){
			List<Cookie> list = this.context.getCookieStore().getCookies();
			for (Cookie cookie : list) {
				log.info("Request Cookie : " + cookie.getName() + "|" + cookie.getValue());
			}
		}*/
	}
	
	
	
	public EPHttpPost(String url, ConnectionCallBack callback, User u, List<NameValuePair> formparams) {
		System.out.println("HTTP POST URL : " + url);
		this.callback = callback;
		this.httpPost = new HttpPost(url);
		RequestConfig requestConfig = RequestConfig.custom().setSocketTimeout(ConnectionConstant.SOCKET_TIMEOUT).
				setConnectTimeout(ConnectionConstant.CONNECT_TIMEOUT).build();
		httpPost.setConfig(requestConfig);
		HttpHeader h = u.getHeader();
		httpPost.setHeader("Accept", h.getAccept());
		httpPost.setHeader("Accept-Encoding", h.getAccept());
		httpPost.setHeader("Accept-Language", h.getAcceptLanguage());
		httpPost.setHeader("Cache-Control", h.getCacheControl());
		httpPost.setHeader("Connection", h.getConnection());
		httpPost.setHeader("Content-Type", h.getContentType());
		httpPost.setHeader("Host", h.getHost());
		httpPost.setHeader("Origin", h.getOrigin());
		httpPost.setHeader("Pragma", h.getPragma());
		httpPost.setHeader("Referer", h.getReferer());
		httpPost.setHeader("User-Agent", h.getUserAgent());
		httpPost.setHeader("X-Requested-With", h.getXRequestedWith());
		UrlEncodedFormEntity entity = new UrlEncodedFormEntity(formparams, Consts.UTF_8);
		httpPost.setEntity(entity);
		this.context = u.getContext();
		this.client = u.getClient();
		/*if(this.context != null && this.context.getCookieStore() != null){
			List<Cookie> list = this.context.getCookieStore().getCookies();
			for (Cookie cookie : list) {
				log.info("Request Cookie : " + cookie.getName() + "|" + cookie.getValue());
			}
		}*/
	}
	
	@Deprecated
	public EPHttpPost(String url, ConnectionCallBack callback, String sessionid, List<NameValuePair> formparams) {
		this.callback = callback;
		this.httpPost = new HttpPost(url);
		RequestConfig requestConfig = RequestConfig.custom().setSocketTimeout(ConnectionConstant.SOCKET_TIMEOUT).
				setConnectTimeout(ConnectionConstant.CONNECT_TIMEOUT).build();
		httpPost.setConfig(requestConfig);
		httpPost.addHeader("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8");
		httpPost.addHeader("Accept-Language", "zh-CN,zh;q=0.8,en;q=0.6,ja;q=0.4,ko;q=0.2,zh-TW;q=0.2");
		httpPost.addHeader("Connection", "keep-alive");
		httpPost.addHeader("Host", "www.finnciti.com");
		httpPost.addHeader("Referer", "https://www.finnciti.com/?page=desk_epx_buy");
		httpPost.addHeader("Cookie", sessionid);
		httpPost.addHeader("User-Agent", "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/33.0.1750.117 Safari/537.36");
		UrlEncodedFormEntity entity = new UrlEncodedFormEntity(formparams, Consts.UTF_8);
		httpPost.setEntity(entity);
	}
	
	
	public long connection(){
		long start = System.currentTimeMillis();
		CloseableHttpResponse response = null;
		int statusCode = 0;
		try {
			response = this.client.execute(httpPost, context);
			if(response != null && response.getStatusLine() != null){
				statusCode = response.getStatusLine().getStatusCode();
				Header []headers = response.getAllHeaders();
				System.out.println("Http Post , Response Headers : ");
				for (Header header : headers) {
					System.out.println("name : " + header.getName() + "   value: " + header.getValue());
				}
			}
			if(response.getEntity() != null){
				HttpEntity entity = response.getEntity();
				callback.callback(response);
				String entityBody = null;
				try {
					byte[] bytes = EntityUtils.toByteArray(entity);
					entityBody = new String(bytes, Consts.UTF_8); // utf-8
					// entityBody = EntityUtils.toString(entity,
					// this.charset);
				} catch (ParseException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
				System.out.println("Response Body : " + entityBody);
				callback.callback(entityBody);
			}
			
		} catch (ClientProtocolException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		} catch (IOException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				if(response != null)
					response.close();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			// recall
			if(isReConnection && !(statusCode == 200 || statusCode == 302)){
				this.connection();
			}
		}
		log.info("cost time : " + (System.currentTimeMillis() - start));
		return System.currentTimeMillis() - start;
	}

	public boolean isReConnection() {
		return isReConnection;
	}

	public void setReConnection(boolean isReConnection) {
		this.isReConnection = isReConnection;
	}
}
