df <- read.csv2("/home/gabitoju/Dropbox/gabitoju.github.io/datalab/data/guns_n_roses2.csv", sep=";", header=TRUE)
sec=c(df$Seconds)
names(sec)=df$Title
par(bg=rgb(252, 252, 252, maxColorValue=255))
box <- boxplot(sec, pars=list(xaxt="n", outcol="red"), col=rgb(31, 119, 180, maxColorValue=255), horizontal=TRUE, staplewex=1)
axis(
    1,
    at=axTicks(1),
    labels=paste(axTicks(1) %/% 60,sprintf("%02d",axTicks(1) %% 60),sep=":"),
    las=2
)
text(y=box$group+0.1, box$out, names(sec)[which(sec %in% box$out, arr.ind = TRUE)], cex=0.6)
d <- as.character(floor(as.double(sprintf("%02f",box$stats[3] %% 60))))
mtext(paste(box$stats[1] %/% 60,sprintf("%02d",box$stats[1] %% 60),sep=":"), side=3, at=box$stats[1], line=-3, cex=0.8)
mtext(paste(box$stats[2] %/% 60,sprintf("%02d",box$stats[2] %% 60),sep=":"), side=3, at=box$stats[2], line=-3, cex=0.8)
mtext(paste(box$stats[3] %/% 60,d,sep=":"), side=3, at=box$stats[3], line=-3, cex=0.8)
mtext(paste(box$stats[4] %/% 60,sprintf("%02d",box$stats[4] %% 60),sep=":"), side=3, at=box$stats[4], line=-3, cex=0.8)
mtext(paste(box$stats[5] %/% 60,sprintf("%02d",box$stats[5] %% 60),sep=":"), side=3, at=box$stats[5], line=-3, cex=0.8)

wl=c(3087, 3051, 2501, 1692, 1495, 802, 463, 204, 169, 66, 21, 20, 7, 1)
names(wl) = c(3,4,2,1,5,6,7,8,9,10,12,11,13,14)
bplt <- barplot(wl, col=rgb(31, 119, 180, maxColorValue=255), xlab="Word length")
text(cex=1, x=bplt-.15, y=450, wl, xpd=TRUE, srt=90)
