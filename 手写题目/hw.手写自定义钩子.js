/**
 * 自定义倒计时钩子 const {count} = useCount(50)
 * 
 */
const useCount = (count) => {
    const [cnt, setCnt] = useState(count);
    useEffect(() => {
        if (count <= 0) return
        const timer = setTimeout(() => {
            setCnt(prev => {
                const cur = prev + 1
                console.log(cur)
                return cur
            })
        }, 1000)
        return () => clearTimeout(timer)
    }, [cnt])
    return cnt
}

/**
 * 实现自定义钩子useRequest，返回loading状态
 */
const useRequest = (url, options, {onSucc, onErr}) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const [err, setErr] = useState(null);

    useEffect(() => {
        let isMounted = true;
        setLoading(true)
        const res = await  fetch(url, options);
        if (res.ok) {
            const data = await res.json();
            if (data.code === 200 && isMounted) {
                setData(data.data);
                onSucc && onSucc();
            } else {
                if (isMounted) {
                     setErr(data.msg);
                    onErr && onErr();
                }
               
            }
        } else {

        }
        return () => {
            isMounted = false; // 清理函数，防止组件卸载后更新状态
            };
    }, [url, onSucc, onErr])

    return {loading, data, err}
}